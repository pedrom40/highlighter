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
	var textSelection;
	
	// if browser supports getSelection and .modify
	if (window.getSelection && (textSelection = window.getSelection()).modify){
		
		textSelection = window.getSelection();
		if (!textSelection.isCollapsed){
			
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
			
		}
		
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
		
		// post to DB
		$.ajax({
			method:"POST",
			url:"saveSelection.php",
			data: {student_id:1, cb_id:$('#cbID').val(), category_id:categoryIDToSaveItTo, selection_content:textToSave}
		})
		
		// on successful post
		.done(function(msg) {
			
			// count elements in category list
			var newElementID = calculateNextID(categoryIDToSaveItTo);
			
			// make clean ID reference
			var createIDString = 'category'+categoryIDToSaveItTo+'_'+newElementID;
			createIDString.toString();
			
			// show selections container
			$('#selectionsContainer').show('fast');
			
			// push to corresponding list
			$('#category'+categoryIDToSaveItTo).append('<dd id="'+createIDString+'" class="savedElements">'+textToSave+'</dd>');
			$('#category'+categoryIDToSaveItTo).append(''+
				'<dd id="buttons_'+createIDString+'" class="buttons">'+
					'<div class="btn-group btn-group-xs" role="group" aria-label="selectionBtns">'+
						'<button id="'+createIDString+'_editBtn" type="button" class="selectionEditBtn btn btn-default" title="Edit Selection"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></button>'+
						'<button id="'+createIDString+'_deleteBtn" type="button" class="selectionDeleteBtn btn btn-default" title="Delete Selection"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button>'+
					'</div>'+
				'</dd>');
			
			// highlight selection with category color
			highlightSelection(textToSave, categoryIDToSaveItTo, newElementID);
			
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

function calculateNextID(categoryID){
	
	var currentNumOfSelections = $('#category'+categoryID+' dd').length;
	var nextElementNumber = 0;
	
	// step by 1
	if (currentNumOfSelections == 0){
		nextElementNumber = 1;
	}
	else {
		nextElementNumber = Number(currentNumOfSelections) + 1;
	}
	
	return nextElementNumber;
	
}

function highlightSelection(textToSave, categoryIDToSaveItTo, elementNumber){
	
	var src_str = $('#cbContent').html();
	var term = textToSave;
	term = term.replace(/(\s+)/,'(<[^>]+>)*$1(<[^>]+>)*');
	var pattern = new RegExp("("+term+")", "gi");
	
	src_str = src_str.replace(pattern, '<mark id="mark_category'+categoryIDToSaveItTo+'_'+elementNumber+'" class="category'+categoryIDToSaveItTo+'Highlight">$1</mark>');
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
	
}

function saveEditedSelection(){
	
	// update list item
	var elementID = $('#editSelectionElementID').val();
	$('dd#'+elementID).html($('#editSelectionHolder').val());
	
	// reset edit selection dialog
	resetEditSelectionDialog();
	
}

function deleteSelectionConfirm(elementID){
	
	// open category selection dialog
	$('#deleteSelectionDialog').modal('show');
	
	// remove btn identifier
	var cleanElementID = elementID.replace("_deleteBtn", "");
	
	// set selection in window for reference
	$('#deleteSelectionDisplay').html('<em>'+$('dd#'+cleanElementID).html()+'</em>');
	
	// set id
	$('#deleteSelectionElementID').val(cleanElementID);
	
}

function deleteSelection(){
	
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
	
	// close delete dialog
	resetDeleteSelectionDialog();
	
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
	$('#editSelectionHolder').val('');
	$('#editSelectionElementID').val('');
	
	// close the category selection dialog
	$('#editSelectionDialog').modal('hide');
	
}

function resetDeleteSelectionDialog(){
	
	// reset category select menu
	$('#deleteSelectionDisplay').val('');
	
	// close the category selection dialog
	$('#deleteSelectionDialog').modal('hide');
	
}