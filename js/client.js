$(document).ready(function(e) {
  
	// for non-touch devices
	$('#cbContent').mouseup(function(){
		var selectedText = getTextSelection();
	})
	
	// for touch devices
	.bind('touchend', function(e){
		var selectedText = getTextSelection();
	});
	
});


function getTextSelection() {
	var sel;
	
	// if browser supports getSelection and .modify
	if (window.getSelection && (sel = window.getSelection()).modify){
		
		sel = window.getSelection();
		if (!sel.isCollapsed){
			
			// Detect if selection is backwards
			var range = document.createRange();
			range.setStart(sel.anchorNode, sel.anchorOffset);
			range.setEnd(sel.focusNode, sel.focusOffset);
			
			var backwards = range.collapsed;
			range.detach();
			
			// modify() works on the focus of the selection
			var endNode = sel.focusNode, endOffset = sel.focusOffset;
			sel.collapse(sel.anchorNode, sel.anchorOffset);
			
			var direction = [];
			if (backwards){
				direction = ['backward', 'forward'];
			}
			else {
				direction = ['forward', 'backward'];
			}
			
			sel.modify("move", direction[0], "character");
			sel.modify("move", direction[1], "word");
			sel.extend(endNode, endOffset);
			sel.modify("extend", direction[1], "character");
			sel.modify("extend", direction[0], "word");
			
			if (sel !== ''){
				alert('categorize this text: '+sel);
			}
			
		}
		
	}
	
	// if browser does not support getSelection
	else if ((sel = document.selection) && sel.type != "Control"){
		
		var textRange = sel.createRange();
		
		if (textRange.text) {
			
			textRange.expand("word");
			
			// Move the end back to not include the word's trailing space(s), if necessary
			while (/\s$/.test(textRange.text)){
				textRange.moveEnd("character", -1);
			}
			
			textRange.select();
			
			if (sel !== ''){
				alert('categorize this text: '+sel);
			}
			
		}
		
	}
	
	// last IE alternative
	else {
		
		sel = window.getSelection().toString();
		
		if (sel !== ''){
			alert('categorize this text: '+sel);
		}
	}
	
}