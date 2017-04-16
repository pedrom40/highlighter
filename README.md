# Challenge Brief Highlighter
Interactive app that saves selected text to categories for further study. Student may add as many text selections as needed and has ability to edit and delete them. All interactions are saved to the student database and preload upon refresh.


# Features
* Works in all major browsers: Chrome, FireFox, MS Edge/IE, Safari (not tested on Mac because I don't have one)
* Works on touch devices
* Created function that highlights the whole word even if only half the word was highlighted.
* Single page app, no page reloading


# Technology
* PHP
* MySQL
* jQuery
* Bootstrap


# New Features to Add
* Virtual walk through to demonstrate how to use the app
* Utilize database transactions to prevent issues that arise from multiple users at the same time. Tried but couldn't get this to work, need a little more PHP research time
* Real-time handling features. Switch from AJAX to WebSockets or Webhooks to better handle data transfer
* Sorting of selections. I would like to add a feature where students can drag and drop a selection to reorder them under their headings


# Bugs
* MS Edge: After selecting text, the browser selects the rest of the page even though it only saves original selection
* The expand/collapse icon doesn't change as applied, need to fix that
* Not necessarily a bug, but thought I'd mention hard-coded query copying because I couldn't loop through the same query results more than once. Again, need more PHP research time
* On single word double click, it selects the word next to it