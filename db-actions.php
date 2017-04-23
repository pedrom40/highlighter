<?php
	
	// set DB connection
	require '/includes/db-connection.php';
	
	// if inserting new record
	if ($_SERVER['REQUEST_METHOD'] === 'POST' && $_POST['action'] == 'insert'){
		
		// check for req. fields
		if (!empty($_POST['student_id']) && !empty($_POST['cb_id']) && !empty($_POST['category_id']) && !empty($_POST['selection_content'])){
			
			// assign cleaner variables
			$studentID 				= trim($_POST['student_id']);
			$cbID 						= trim($_POST['cb_id']);
			$categoryID 			= trim($_POST['category_id']);
			$selectionContent = trim(json_encode($_POST['selection_content']));
			
			// remove double quotes
			$convertedSelectionContent = (string)$selectionContent;
			$cleanedSelectionContent = str_replace('""', '"', $convertedSelectionContent);
			$trimmedSelectionContent = substr($cleanedSelectionContent, 1);
			
			// insert statement (need to learn how to use TRANSACTIONS with PHP, need to sanitize form values)
			$sql = 	"INSERT INTO e2l.challenge_briefs_student_selections (student_id, cb_id, category_id, selection_content, selection_content_edited)".
							"VALUES (".$studentID.", ".$cbID.", ".$categoryID.", '".$trimmedSelectionContent."', '".$trimmedSelectionContent."')";
			
			// if action worked
			if ($conn->query($sql) === TRUE) {
				
				// return new ID of record
				echo $conn->insert_id;
				
			}
			
			// if it didn't
			else {
				echo "Error: " . $sql . "<br>" . $conn->error;
			}
			
		}
		
		// if missing req. info
		else {
			
			// send error msg
			echo 'Error: Please fill in all required information before submitting the form.';
			
		}
		
	}
	
	// if updating a record
	else if ($_SERVER['REQUEST_METHOD'] === 'POST' && $_POST['action'] == 'update'){
		
		// check for req. fields
		if (!empty($_POST['record_id']) && !empty($_POST['category_id']) && !empty($_POST['selection_content_edited'])){
			
			// assign cleaner variables
			$recordID 							= trim($_POST['record_id']);
			$categoryID 						= trim($_POST['category_id']);
			$selectionContentEdited = trim(json_encode($_POST['selection_content_edited']));
			
			// remove double quotes
			$convertedSelectionContentEdited = (string)$selectionContentEdited;
			$cleanedSelectionContentEdited = str_replace('""', '"', $convertedSelectionContentEdited);
			$trimmedSelectionContentEdited = substr($cleanedSelectionContentEdited, 1);
			
			// insert statement (need to learn how to use TRANSACTIONS with PHP, need to sanitize form values)
			$sql = 	"UPDATE e2l.challenge_briefs_student_selections ".
							"SET ".
								"category_id = ".$categoryID.", ".
								"selection_content_edited = '".$trimmedSelectionContentEdited."' ".
							"WHERE id = ".$recordID;
			
			// if action worked
			if ($conn->query($sql) === TRUE) {
				
				// return new ID of record
				echo $recordID;
				
			}
			
			// if it didn't
			else {
				echo "Error: " . $sql . "<br>" . $conn->error;
			}
			
		}
		
		// if missing req. info
		else {
			
			// send error msg
			echo 'Error: Please fill in all required information before submitting the form.';
			
		}
		
	}
	
	// else if getting original text
	else if ($_SERVER['REQUEST_METHOD'] === 'POST' && $_POST['action'] == 'getOriginalText'){
		
		// check for req. fields
		if (!empty($_POST['record_id'])){
			
			// assign cleaner variables
			$recordID = trim($_POST['record_id']);
			
			// insert statement (need to learn how to use TRANSACTIONS with PHP, need to sanitize form values)
			$sql 		= "SELECT selection_content FROM e2l.challenge_briefs_student_selections WHERE id = ".$recordID;
			$result = $conn->query($sql);
			
			// if rows exists
			if ($result->num_rows > 0) {
				
				// output data of each row
				while($row = $result->fetch_assoc()) {
					
					echo $row["selection_content"];
					
				}
				
			}
			
		}
		
		// if missing req. info
		else {
			
			// send error msg
			echo 'Error: Please fill in all required information before submitting the form.';
			
		}
		
	}
	
	// if deleting a record
	else if ($_SERVER['REQUEST_METHOD'] === 'POST' && $_POST['action'] == 'delete'){
		
		// check for req. fields
		if (!empty($_POST['record_id'])){
			
			// assign cleaner variables
			$recordID = trim($_POST['record_id']);
			
			// insert statement (need to learn how to use TRANSACTIONS with PHP, need to sanitize form values)
			$sql = 	"DELETE FROM e2l.challenge_briefs_student_selections ".
							"WHERE id = ".$recordID;
			
			// if action worked
			if ($conn->query($sql) === TRUE) {
				
				// return new ID of record
				echo 'Record successfully deleted.';
				
			}
			
			// if it didn't
			else {
				echo "Error: " . $sql . "<br>" . $conn->error;
			}
			
		}
		
		// if missing req. info
		else {
			
			// send error msg
			echo 'Error: Please fill in all required information before submitting the form.';
			
		}
		
	}
	
	// close DB connection
	$conn->close();
	
?>