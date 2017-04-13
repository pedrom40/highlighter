<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Unit 2: A New Nation (Cloned 2015-08-11) Challenge Brief | eStudio</title>
    <?php include '/includes/header-resources.php' ?>
  </head>
  <body>
    
    <div class="row">
    	<div class="col-md-9">
        <div id="cbContent" class="content-panel">
          <h1>"Unit 2: A New Nation (Cloned 2015-08-11)" | Challenge Brief</h1>
          
          <p>Approximately 239 years ago, the British colonies on the North American continent determined that they were being treated unfairly. They labored for years trying to persuade their king and the people of England to change the policies which victimized them. Ultimately, their persuasive entreaties failed and they declared their independance from England and ultimately fought and won a war to secure their liberty and freedom.</p>
          <p>Last year, a gay couple were nominated for Prom royalty. They were very popular young men and a sweet couple well-known and well-liked by most of the Senior class. Ultimately, the administration of the school removed one of them and allowed only one young man to proceed as a nominee for Prom Prince. Seniors were upset over this as they saw it as an opportunity to show the world how they felt about gay rights, and they felt the administration was acting arbitraily-- perhaps even acting in a bigoted fashion. However, upon further investigation, what they discovered was that the by-laws of the prom were written in such a way that stated that only one young man and one young&nbsp;<em>woman</em>&nbsp;could be nominated. Administration explained that the by-laws could be changed, but not the week before prom. It was too late for them to change anything, and their favorite couple was not able to become Prom Royalty.</p>
          <p>The fact is that many rules and by-laws were created in by-gone eras. Things change. Attitudes evolve and, fortunately, we live in a new age of tolerance and compassion. However, rules and by-laws, as you have seen, cannot be changed overnight. Some of them cannot be changed without some serious persuasion or even an out-and-out fight. As responsible members of the highschool community, can you think of by-laws, protocols, or&nbsp;<em>traditions</em>&nbsp;that need updating, changing, or even abolishing? Are there archaic rules or procedures that students can identify and develop better alternatives? Certainly there are.</p>
          <p>Your group will need to identify a specific problem and create a solution and then convince school administrators to accept your recommendations and/or demands.&nbsp;</p>
          <p>Presentations will be made to the class and placed in a bracket. The winning group will make their presentations to the school administration, possibly the student body for ratification, and ultimately the school board for final approval.</p><br><br>
          
          <p>How can we use the examples of foundational documents and the Framers of the United States to achieve current goals or needs within the school community?</p><br><br>
          
          <p>Your project will include powerful, passionate persuasive speaking that is carefully prepared, well focused, intelligent, and reasonable. You will need to analyze and utilize the persuasive and argumentative techniques practiced and perfected by the framers of the Constitution of the United States and the U.S. Government.</p>
          
          <ul>
            <li>CCSS.ELA-Literacy.RI 11-12.5: Analyze and evaluate the effectiveness of the structure an author uses in his or her exposition or argument, including whether the structure makes points clear, convincing, and engaging.</li>
            <li>CCSS.ELA-LITERACY RI 11-12.8: Delineate and evaluate the reasoning in seminal US texts including the application of Constitutional principals and use of legal reasoning and the premises, purposes, and arguments in works of public advocacy.</li>
            <li>CCSS.ELA-LITERACY RI 11-12.9: Analyze 17th, 18th, and 19th century foundational US documents of historical and literary significance for their themes, purposes, and rhetorical features.</li>
            <li>CCSS.ELA-LITERACY W.11-12.1: Write arguments to support claims in an analysis of substantive topics or texts using valid reasoning and relevant and sufficient evidence.</li>
            <li>CCSS.ELA-LITERACY SL.11-12.4: Present information, findings, and supporting evidence conveying a clear and distinct perspective such that listeners can follow the line of reasoning, alternative or opposing perspectives are addressed, and the organization, development, substance, and style are appropriate to the purpose, audience, and a range of formal and informal tasks.</li>
            <li>CCSS.ELA-LITERACY L.11-12.1: Demonstrate command of the conventions of standard English usage while writing or speaking.</li>
            <li>CCSS.ELA-LITERACY.RL.11-12.4Determine the meaning of words and phrases as they are used in the text, including figurative and connotative meanings; analyze the impact of specific word choices on meaning and tone, including words with multiple meanings or language that is particularly fresh, engaging, or beautiful.</li>
          </ul>
        </div>
      </div>
      
      <div id="selectionsContainer" class="col-lg-3">
        <div class="content-panel">
        	
          <h1>Your Selections</h1>
          
          <dl id="category1">
          	<dd class="categoryName">Project Requirements</dd>
          </dl>
          
          <dl id="category2">
          	<dd class="categoryName">Driving Question</dd>
          </dl>
          
          <dl id="category3">
          	<dd class="categoryName">Know</dd>
          </dl>
          
          <dl id="category4">
          	<dd class="categoryName">Need To Know</dd>
          </dl>
          
          <dl id="category5">
          	<dd class="categoryName">Unknown / Vocabulary Word</dd>
          </dl>
          
        </div>
      </div>
      
    </div>
    
    <div id="categorySelectionDialog" title="Select a Category" class="dialogWindow">
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
    
    <div id="editSelectionDialog" title="Edit Selection" class="dialogWindow">
    	<p>Edit your selection below:</p>
      
      <textarea id="editSelectionHolder"></textarea>
      
      <p>
      	<button id="editSelectionSaveBtn">Save</button>
        <button id="editSelectionCancelBtn">Cancel</button>
      </p>
      
      <input type="hidden" id="editSelectionElementID" value="">
    </div>
    
    <?php include '/includes/footer-resources.php' ?>
  </body>
</html>