$(document).ready(function(e) {
  
	// for non-touch devices
	$('#cbContent').mouseup(function(){
		
		callSelectionFunctions();
		
	})
	
	// for touch devices
	.bind('touchend', function(e){
		
		callSelectionFunctions();
		
	});
	
	
	// init dialog windows
	$('#categorySelectionDialog').dialog({
		autoOpen:false,
		show: {
			effect: "fadeIn",
			duration: 500
		},
		hide: {
			effect: "fadeOut",
			duration: 500
		}
	});
	$('#editSelectionDialog').dialog({
		autoOpen:false,
		show: {
			effect: "fadeIn",
			duration: 500
		},
		hide: {
			effect: "fadeOut",
			duration: 500
		}
	});
	$('#deleteSelectionDialog').dialog({
		autoOpen:false,
		show: {
			effect: "fadeIn",
			duration: 500
		},
		hide: {
			effect: "fadeOut",
			duration: 500
		}
	});
	
	
	// edit selection dialog functions
	$('#editSelectionSaveBtn').click(function(e) {
    saveEditedSelection();
  });
	
	$('#editSelectionCancelBtn').click(function(e) {
    $('#editSelectionDialog').dialog('close');
  });
	
	
	// listener for edit element btn clicks
	$('#selectionsContainer dl').on('click', 'a.selectionEditBtn.ui-button.ui-widget.ui-corner-all.ui-button-icon-only', function(){
    editSelection(this.id);
	});
	
	// listener for delete element btn clicks
	$('#selectionsContainer dl').on('click', 'a.selectionDeleteBtn.ui-button.ui-widget.ui-corner-all.ui-button-icon-only', function(){
    deleteSelectionConfirm(this.id);
	});
	$('#deleteSelectionConfirmBtn').click(function(e) {
    deleteSelection();
  });
	$('#deleteSelectionCancelBtn').click(function(e) {
    resetDeleteSelectionDialog();
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
	$('#categorySelectionDialog').dialog('open');
	
	// set selection in window for reference
	$('#selectionDisplay').html(selection);
	
}

function saveTextToCategory(textToSave, categoryIDToSaveItTo){
	
	if (categoryIDToSaveItTo !== ''){
		
		// count elements in category list
		var newElementID = calculateNextID(categoryIDToSaveItTo);
		
		// make clean ID reference
		var createIDString = 'category'+categoryIDToSaveItTo+'_'+newElementID;
		createIDString.toString();
		
		// push to corresponding list
		$('#category'+categoryIDToSaveItTo).append('<dd id="'+createIDString+'" class="savedElements">'+textToSave+'</dd>');
		$('#category'+categoryIDToSaveItTo).append(''+
			'<dd id="buttons_'+createIDString+'" class="buttons">'+
				'<a id="'+createIDString+'_editBtn" class="selectionEditBtn ui-button ui-widget ui-corner-all ui-button-icon-only" title="Edit Selection"><span class="ui-icon ui-icon-pencil"></span> Edit Selection</a>'+
				'<a id="'+createIDString+'_deleteBtn" class="selectionDeleteBtn ui-button ui-widget ui-corner-all ui-button-icon-only" title="Delete Selection"><span class="ui-icon ui-icon-close"></span> Delete Selection</a>'+
			'</dd>');
		
		// highlight selection with category color
		hightlightSelection(textToSave, categoryIDToSaveItTo, newElementID);
		
		// show list
		$('#category'+categoryIDToSaveItTo).fadeIn('fast');
		
		// reset category selector
		resetCategorySelectMenu();
		
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

function hightlightSelection(textToSave, categoryIDToSaveItTo, elementNumber){
	
	var src_str = $('#cbContent').html();
	var term = textToSave;
	term = term.replace(/(\s+)/,'(<[^>]+>)*$1(<[^>]+>)*');
	var pattern = new RegExp("("+term+")", "gi");
	
	src_str = src_str.replace(pattern, '<mark id="category'+categoryIDToSaveItTo+'_'+elementNumber+'" class="category'+categoryIDToSaveItTo+'Highlight">$1</mark>');
	src_str = src_str.replace(/(<mark>[^<>]*)((<[^>]+>)+)([^<>]*<\/mark>)/,"$1</mark>$2<mark>$4");
	
	$('#cbContent').html(src_str);
	
}

function resetCategorySelectMenu(){
	
	// reset category select menu
	$('#categories').val('');
	
	// close the category selection dialog
	$('#categorySelectionDialog').dialog('close');
	
}

function editSelection(elementID){
	
	// open category selection dialog
	$('#editSelectionDialog').dialog('open');
	
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
	$('#deleteSelectionDialog').dialog('open');
	
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
	deleteHightlightedSelection(elementID);
	
	// destroy dd element
	$('dd#'+elementID).remove();
	
	// destroy dd buttons
	$('dd#buttons_'+elementID).remove();
	
	// close delete dialog
	resetDeleteSelectionDialog();
	
}

function deleteHightlightedSelection(elementID){
	
	var element = $('#cbContent'); //convert string to JQuery element
	
	element.find('mark#'+elementID).each(function(index){
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
	$('#editSelectionDialog').dialog('close');
	
}

function resetDeleteSelectionDialog(){
	
	// reset category select menu
	$('#deleteSelectionDisplay').val('');
	
	// close the category selection dialog
	$('#deleteSelectionDialog').dialog('close');
	
}