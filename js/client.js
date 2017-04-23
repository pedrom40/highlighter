$(document).ready(function(e) {
  
	// for non-touch devices
	$('#cbContent').mouseup(function(){
		
		callSelectionFunctions();
		
	})
	
	// for touch devices
	.bind('ontouchend', function(e){
		
		callSelectionFunctions();
		
	});
	
	
	// edit selection dialog functions
	$('#editSelectionSaveBtn').click(function(e) {
    saveEditedSelection();
  });
	
	$('#editSelectionCancelBtn').click(function(e) {
		$('#editSelectionDialog').modal('hide');
		resetEditSelectionDialog();
  });
	
	
	// listener for edit element btn clicks
	$('#selectionsContainer dl').on('click', 'button.selectionEditBtn.btn.btn-default', function(){
    editSelection(this.id);
	});
	
	// listener for delete element btn clicks
	$('#selectionsContainer dl').on('click', 'button.selectionDeleteBtn.btn.btn-default', function(){
    deleteSelectionConfirm(this.id);
	});
	$('#deleteSelectionConfirmBtn').click(function(e) {
    deleteSelection();
  });
	$('#deleteSelectionCancelBtn').click(function(e) {
    resetDeleteSelectionDialog();
  });
	
	// listener to toggle category list
	$('.categoryName').click(function(e) {
    
		// get parent list element
		var listElement = $(this).parent().attr('id');
		
		// loop thru list
		$('#'+listElement+' dd').each(function(index, element) {
      
			// if this is a selection or buttons item and you can see it
			if ($(this).css('display') !== 'none' && ($(this).attr('class') == 'savedElements' || $(this).attr('class') == 'buttons')){
				
				// hide it
				$(this).css('display', 'none');
				
				// rotate chevron
				$('#'+listElement+' .categoryName span').addClass('close');
				
			}
			
			// it not a selection or buttons item and/or it's hidden
			else {
				
				// show it
				$(this).css('display', 'block');
				
				// rotate chevron
				$('#'+listElement+' .categoryName span').removeClass('close');
				
			}
			
    });
		
  });
	
});


function callSelectionFunctions(){
	
	var selectedText = '';
	
	// search for selected text
	selectedText = getTextSelection();
	
	// check if anything was selected
	if (textHasBeenSelected(selectedText)){
		
		// categorize text
		categorizeText(selectedText);
		
	}
	
}

function getTextSelection() {
	
	// text only version
	var textSelection;
	
	// if browser supports getSelection and .modify
	if (window.getSelection && (textSelection = window.getSelection()).modify){
		
		textSelection = window.getSelection();
		//textSelection = textSelection.toString().replace(/  /g,' ');
		
		/*if (!textSelection.isCollapsed){
			
			// Detect if selection is backwards
			var range = document.createRange();
			range.setStart(textSelection.anchorNode, textSelection.anchorOffset);
			range.setEnd(textSelection.focusNode, textSelection.focusOffset);
			
			var backwards = range.collapsed;
			range.detach();
			
			// modify() works on the focus of the selection
			var endNode = textSelection.focusNode, endOffset = textSelection.focusOffset;
			textSelection.collapse(textSelection.anchorNode, textSelection.anchorOffset);
			
			var direction = [];
			if (backwards){
				direction = ['backward', 'forward'];
			}
			else {
				direction = ['forward', 'backward'];
			}
			
			textSelection.modify("move", direction[0], "character");
			textSelection.modify("move", direction[1], "word");
			textSelection.extend(endNode, endOffset);
			textSelection.modify("extend", direction[1], "character");
			textSelection.modify("extend", direction[0], "word");
			
		}*/
		
	}
	
	// if browser does not support getSelection
	else if ((textSelection = document.selection) && textSelection.type != "Control"){
		
		var textRange = textSelection.createRange();
		
		if (textRange.text) {
			
			textRange.expand("word");
			
			// Move the end back to not include the word's trailing space(s), if necessary
			while (/\s$/.test(textRange.text)){
				textRange.moveEnd("character", -1);
			}
			
			textSelection = textRange.select();
			
		}
		
	}
	
	// last IE alternative
	else {
		
		textSelection = window.getSelection().toString();
		
	}
	
	// return text as string
	return textSelection.toString().trim();
	
}

function textHasBeenSelected(selection){
	
	if (selection.length > 0){
		return true;
	}
	else {
		return false;
	}
	
}

function categorizeText(selection){
	
	// open category selection dialog
	$('#categorySelectionDialog').modal('show');
	
	// set selection in window for reference
	$('#selectionDisplay').html(selection);
	
}

function saveTextToCategory(textToSave, categoryIDToSaveItTo){
	
	if (categoryIDToSaveItTo !== ''){
		
		// get selected category
		var cbID = $('#cbID').val();
		
		// get student id
		var studentID = $('#studentID').val();
		
		// convert to JSON
		textToSave = JSON.stringify(textToSave);
		
		// post to DB
		$.ajax({
			method:"POST",
			url:"db-actions.php",
			data: {action:'insert', student_id:studentID, cb_id:cbID, category_id:categoryIDToSaveItTo, selection_content:textToSave}
		})
		
		// on successful post
		.done(function(newRecordID) {
			
			// make clean ID reference
			var createIDString = 'category'+categoryIDToSaveItTo+'_'+newRecordID;
			createIDString.toString();
			
			// push to corresponding list
			createNewListItem(categoryIDToSaveItTo, createIDString, textToSave);
			
			// split at '\n\n'
			var splitText = textToSave.toString()
																	.replace('"', '')
																	.split('\n\n');
			
			// loop thru result and highlight pieces
			for (var i=0; i < splitText.length; i++){
				
				// highlight selection with category color
				highlightSelection(splitText[i].replace('"', ''), categoryIDToSaveItTo, createIDString);
				
			}
			
			// activate list header
			$('#category'+categoryIDToSaveItTo+' .categoryName').addClass('activated');
			
			// show toggle button on category header
			$('#category'+categoryIDToSaveItTo+' dd span').show('fast');
			
			// reset category selector
			resetCategorySelectMenu();
			
		})
		
		// on error
		.error(function(jqXHR, textStatus, errorThrown){
			
			// create error string
			var error_string = '<h3>Error Occurred:</h3> <p>' + textStatus + ' ' + errorThrown + '</p>';
			
			// display error string
			$('#alertContainer').html(error_string);
			$('#alertContainer').show();
			
		});
		
	}
	
}

function createNewListItem(categoryID, elementID, selectionText){
	
	$('#category'+categoryID).append('<dd id="'+elementID+'" class="savedElements">'+JSON.parse(JSON.stringify(selectionText))+'</dd>');
	$('#category'+categoryID).append(''+
		'<dd id="buttons_'+elementID+'" class="buttons">'+
			'<div class="btn-group btn-group-xs" role="group" aria-label="selectionBtns">'+
				'<button id="'+elementID+'_editBtn" type="button" class="selectionEditBtn btn btn-default" title="Edit Selection"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></button>'+
				'<button id="'+elementID+'_deleteBtn" type="button" class="selectionDeleteBtn btn btn-default" title="Delete Selection"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button>'+
			'</div>'+
		'</dd>');
		
}

function highlightSelection(textToSave, categoryIDToSaveItTo, elementNumber){
	
	var src_str = $('#cbContent').html();
	var term = textToSave;
	term = term.replace(/(\s+)/,'(<[^>]+>)*$1(<[^>]+>)*');
	var pattern = new RegExp('('+term+')', "gi");
	
	src_str = src_str.replace(pattern, '<mark id="mark_'+elementNumber+'" class="category'+categoryIDToSaveItTo+'Highlight">$1</mark>');
	src_str = src_str.replace(/(<mark>[^<>]*)((<[^>]+>)+)([^<>]*<\/mark>)/,"$1</mark>$2<mark>$4");
	
	$('#cbContent').html(src_str);
	
}

function resetCategorySelectMenu(){
	
	// reset category select menu
	$('#categories').val('');
	
	// close the category selection dialog
	$('#categorySelectionDialog').modal('hide');
	
}

function editSelection(elementID){
	
	// open category selection dialog
	$('#editSelectionDialog').modal('show');
	
	// remove btn identifier
	var cleanElementID = elementID.replace("_editBtn", "");
	
	// set selection in window for reference
	$('#editSelectionHolder').val($('dd#'+cleanElementID).html());
	
	// set id
	$('#editSelectionElementID').val(cleanElementID);
	
	// set record ID
	var recordID = cleanElementID.split('_');
	$('#editRecordID').val(recordID[1]);
	
	// set categoryEdit selection
	var categoryID = getCategoryID(cleanElementID);
	$('#editCategoryID').val(categoryID);
	
	// get original selection text
	$.ajax({
		method:"POST",
		url:"db-actions.php",
		data: {action:'getOriginalText', record_id:recordID[1]}
	})
	
	// on successful post
	.done(function(originalText) {
		
		// set original text
		$('#editSelectionHolderOriginal').val(originalText);
		
	})
	
	// on error
	.error(function(jqXHR, textStatus, errorThrown){
		
		// create error string
		var error_string = '<h3>Error Occurred:</h3> <p>' + textStatus + ' ' + errorThrown + '</p>';
		
		// display error string
		$('#alertContainer').html(error_string);
		$('#alertContainer').show();
		
	});
	
}

function getCategoryID(elementToSearch){ // from element like this: category2_2 (returns the number after 'category')
	
	var splitElement = elementToSearch.split('_');
	var elementLength = splitElement[0].length;
	elementLength = elementLength-1;
	var categoryID = splitElement[0].charAt(elementLength);
	
	return categoryID;
	
}

function getRecordID(elementToSearch){ // from element like this: category2_2 (returns the number after '_')
	
	var splitElement = elementToSearch.split('_');
	return splitElement[1];
	
}

function saveEditedSelection(){
	
	// get record id
	var recordID = $('#editRecordID').val();
	
	// get selected category
	var cbID = $('#cbID').val();
	
	// get student id
	var studentID = $('#studentID').val();
	
	// get selected category
	var selectedCategory = $('#editCategoryID').val();
	
	// get original selection text
	var originalSelectionText = $('#editSelectionHolderOriginal').val();
	
	// get updated selection text
	var updatedSelectionText = $('#editSelectionHolder').val();
	
	// post to DB
	$.ajax({
		method:"POST",
		url:"db-actions.php",
		data: {action:'update', record_id:recordID, category_id:selectedCategory, selection_content:originalSelectionText, selection_content_edited:updatedSelectionText}
	})
	
	// on successful post
	.done(function(recordID) {
		
		// get element ID
		var elementID = $('#editSelectionElementID').val();
		
		// update list item
		$('dd#'+elementID).html(updatedSelectionText);
		
		// save old and new element IDs
		var originalElementID = elementID.substr(0, 9);
		var selectedElementID = 'category'+selectedCategory;
		
		// if they don't match, then category changed (used startsWith at first, but not supported by safari)
		if (originalElementID !== selectedElementID){
			
			// delete old highlight
			deleteHighlightedSelection(elementID);
			
			// make clean ID reference
			var createIDString = 'category'+selectedCategory+'_'+recordID;
			createIDString.toString();
			
			// add it to new category list
			createNewListItem(selectedCategory, createIDString, updatedSelectionText);
			
			// remove selection from old category list
			$('dd#'+elementID).remove();
			$('dd#buttons_'+elementID).remove();
			
			// highlight new element
			highlightSelection(originalSelectionText, selectedCategory, createIDString);
			
		}
		
		// reset edit selection dialog
		resetEditSelectionDialog();
		
	})
	
	// on error
	.error(function(jqXHR, textStatus, errorThrown){
		
		// create error string
		var error_string = '<h3>Error Occurred:</h3> <p>' + textStatus + ' ' + errorThrown + '</p>';
		
		// display error string
		$('#alertContainer').html(error_string);
		$('#alertContainer').show();
		
	});
	
}

function deleteSelectionConfirm(elementID){
	
	// open category selection dialog
	$('#deleteSelectionDialog').modal('show');
	
	// remove btn identifier
	var cleanElementID = elementID.replace("_deleteBtn", "");
	
	// set categoryEdit selection
	var recordID = getRecordID(cleanElementID);
	$('#deleteRecordID').val(recordID);
	
	// set selection in window for reference
	$('#deleteSelectionDisplay').html('<em>'+$('dd#'+cleanElementID).html()+'</em>');
	
	// set id
	$('#deleteSelectionElementID').val(cleanElementID);
	
}

function deleteSelection(){
	
	// get record ID
	var recordID = $('#deleteRecordID').val();
	
	// post to DB
	$.ajax({
		method:"POST",
		url:"db-actions.php",
		data: {action:'delete', record_id:recordID}
	})
	
	// on successful post
	.done(function(recordID) {
		
		// get clean ID
		var elementID = $('#deleteSelectionElementID').val();
		
		// remove highlight
		deleteHighlightedSelection(elementID);
		
		// destroy dd element
		$('dd#'+elementID).remove();
		
		// destroy dd buttons
		$('dd#buttons_'+elementID).remove();
		
		// get the category list length
		var splitElement = elementID.split('_');
		var listLen = $('dl#'+splitElement[0]+' dd').length;
		
		// if only header element in the list is left
		if (listLen <= 1){
			
			// hide chevron
			$('dl#'+splitElement[0]+' .categoryName span').css('display', 'none');
			
			// deactivate header
			$('dl#'+splitElement[0]+' .categoryName').removeClass('activated');
			
		}
		
		// remove highlight (run twice incase there was more than one highlight)
		deleteHighlightedSelection(elementID);
		
		// close delete dialog
		resetDeleteSelectionDialog();
		
	})
	
	// on error
	.error(function(jqXHR, textStatus, errorThrown){
		
		// create error string
		var error_string = '<h3>Error Occurred:</h3> <p>' + textStatus + ' ' + errorThrown + '</p>';
		
		// display error string
		$('#alertContainer').html(error_string);
		$('#alertContainer').show();
		
	});
	
}

function deleteHighlightedSelection(elementID){
	
	var element = $('#cbContent'); //convert string to JQuery element
	
	element.find('#mark_'+elementID).each(function(index){
    var text = $(this).text(); //get span content
    $(this).replaceWith(text); //replace all span with just content
	});
	
	var newString = element.html();//get back new string
	
}

function resetEditSelectionDialog(){
	
	// reset category select menu
	$('#editSelectionHolderOriginal').val('');
	$('#editSelectionHolder').val('');
	$('#editSelectionElementID').val('');
	$('#editRecordID').val('');
	
	// close the category selection dialog
	$('#editSelectionDialog').modal('hide');
	
}

function resetDeleteSelectionDialog(){
	
	// reset record ID
	$('#deleteRecordID').val('');
	
	// reset category select menu
	$('#deleteSelectionDisplay').val('');
	
	// close the category selection dialog
	$('#deleteSelectionDialog').modal('hide');
	
}

function loadSelections(recordID, selectionCategory, textToSelect, editedTextToShow){
	
	// make clean ID reference
	var createIDString = 'category'+selectionCategory+'_'+recordID;
	createIDString.toString();
	
	// push to corresponding list
	createNewListItem(selectionCategory, createIDString, editedTextToShow);
	
	// split at '\n\n'
	var splitText = textToSelect.toString()
															.replace('"', '')
															.split('\n\n');
	
	// loop thru result and highlight pieces
	for (var i=0; i < splitText.length; i++){
		
		// highlight selection with category color
		highlightSelection(splitText[i].replace('"', ''), selectionCategory, createIDString);
		
	}
	
	// activate list header
	$('#category'+selectionCategory+' .categoryName').addClass('activated');
	
	// show toggle button on category header
	$('#category'+selectionCategory+' dd span').show('fast');
	
}