<?php
	
	require '/includes/db-connection.php';
	
	// get challenge brief content
	$sql 		= "SELECT id, title, content FROM e2l.challenge_briefs WHERE id = 1";
	$result = $conn->query($sql);
	
	// get challenge brief categories
	$sql 		= "SELECT * FROM e2l.challenge_briefs_categories ORDER BY rank";
	$categories = $conn->query($sql);
	
	$conn->close();
	
?>
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
      <div id="alertContainer" class="alert alert-danger"></div>
      
      <div class="col-lg-9">
        <div id="cbContent" class="content-panel">
          <?php
						
						if ($result->num_rows > 0) {
							
							// output data of each row
							while($row = $result->fetch_assoc()) {
								
								echo "<h1>".$row["title"]."</h1>";
								echo $row["content"];
								echo '<input type="hidden" id="cbID" value="'.$row["id"].'">';
								
							}
							
						}
						else {
							echo "The challenge brief you loaded does not exist or is no longer active. Please go back and choose another brief.";
						}
						
					?>
        </div>
      </div>
      
      <div id="selectionsContainer" class="col-lg-3">
        <div class="content-panel">
          
          <h1>Your Selections</h1>
          <?php include '/includes/category-lists.php' ?>
          
        </div>
      </div>
      
    </div>
    
    <?php include '/includes/modals.php' ?>
    
    <?php include '/includes/footer-resources.php' ?>
  </body>
</html>