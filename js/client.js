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
		
		// push to corresponding list
		$('#category'+categoryIDToSaveItTo).append('<dd>'+textToSave+'</dd>');
		
		// highlight selection with category color
		hightlightSelection(textToSave, categoryIDToSaveItTo);
		
		// show list
		$('#category'+categoryIDToSaveItTo).fadeIn('fast');
		
		// reset category select menu
		$('#categories').val('');
		
		// close the category selection dialog
		$('#categorySelectionDialog').dialog('close');
		
	}
	
}

function hightlightSelection(textToSave, categoryIDToSaveItTo){
	
	var src_str = $("#cbContent").html();
	var term = textToSave;
	term = term.replace(/(\s+)/,"(<[^>]+>)*$1(<[^>]+>)*");
	var pattern = new RegExp("("+term+")", "gi");
	
	src_str = src_str.replace(pattern, "<mark class='category"+categoryIDToSaveItTo+"Highlight'>$1</mark>");
	src_str = src_str.replace(/(<mark>[^<>]*)((<[^>]+>)+)([^<>]*<\/mark>)/,"$1</mark>$2<mark>$4");
	
	$("#cbContent").html(src_str);
	
}