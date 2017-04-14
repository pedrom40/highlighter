<div class="modal fade" id="categorySelectionDialog" tabindex="-1" role="dialog" aria-labelledby="categorySelectModal">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Select a Category</h4>
      </div>
      <div class="modal-body">
        <p>Choose a category to save the following selection:</p>
        <div id="selectionDisplay"></div>
        
        <p>
          <select id="categories" onChange="saveTextToCategory($('#selectionDisplay').html(), this.value);">
            <option value="">Select a Category</option>
            <option value="1">Project Requirements</option>
            <option value="2">Driving Question</option>
            <option value="3">Know</option>
            <option value="4">Need To Know</option>
            <option value="5">Unknown / Vocabulary Word</option>
          </select>
        </p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="editSelectionDialog" tabindex="-1" role="dialog" aria-labelledby="editSelectModal">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Edit Selection</h4>
      </div>
      <div class="modal-body">
        <p>Edit your selection below:</p>
        <textarea id="editSelectionHolder"></textarea>
        <input type="hidden" id="editSelectionElementID" value="">
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" id="editSelectionSaveBtn">Save</button>
        <button type="button" class="btn btn-default" id="editSelectionCancelBtn" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="deleteSelectionDialog" tabindex="-1" role="dialog" aria-labelledby="deleteSelectModal">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Delete Selection</h4>
      </div>
      <div class="modal-body">
        <p>Are you sure you want to delete this selection?</p>
        
        <div id="deleteSelectionDisplay"></div><br>
        
        <input type="hidden" id="deleteSelectionElementID" value="">
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" id="deleteSelectionConfirmBtn">Yes, Delete It</button>
        <button type="button" class="btn btn-default" id="deleteSelectionCancelBtn" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>