<?php
	
	// set DB connection
	require '/includes/db-connection.php';
	
	// if inserting new record
	if ($_POST['action'] == 'insert'){
		
		// insert statement (need to learn how to use TRANSACTIONS with PHP, need to sanitize form values)
		$sql = 	"INSERT INTO e2l.challenge_briefs_student_selections (student_id, cb_id, category_id, selection_content, selection_content_edited)".
						"VALUES (".$_POST['student_id'].", ".$_POST['cb_id'].", ".$_POST['category_id'].", '".$_POST['selection_content']."', '".$_POST['selection_content']."')";
		
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
	
	// if updating a record
	else if ($_POST['action'] == 'update'){
		
		// insert statement (need to learn how to use TRANSACTIONS with PHP, need to sanitize form values)
		$sql = 	"UPDATE e2l.challenge_briefs_student_selections ".
						"SET ".
							"category_id = ".$_POST['category_id'].", ".
							"selection_content = '".$_POST['selection_content']."', ".
							"selection_content_edited = '".$_POST['selection_content_edited']."' ".
						"WHERE id = ".$_POST['record_id'];
		
		// if action worked
		if ($conn->query($sql) === TRUE) {
			
			// return new ID of record
			echo $_POST['record_id'];
			
		}
		
		// if it didn't
		else {
			echo "Error: " . $sql . "<br>" . $conn->error;
		}
		
	}
	
	// else if getting original text
	else if ($_POST['action'] == 'getOriginalText'){
		
		// insert statement (need to learn how to use TRANSACTIONS with PHP, need to sanitize form values)
		$sql 		= "SELECT selection_content FROM e2l.challenge_briefs_student_selections WHERE id = ".$_POST['record_id'];
		$result = $conn->query($sql);
		
		if ($result->num_rows > 0) {
			
			// output data of each row
			while($row = $result->fetch_assoc()) {
				
				echo $row["selection_content"];
				
			}
			
		}
		
	}
	
	// if deleting a record
	else if ($_POST['action'] == 'delete'){
		
		// insert statement (need to learn how to use TRANSACTIONS with PHP, need to sanitize form values)
		$sql = 	"DELETE FROM e2l.challenge_briefs_student_selections ".
						"WHERE id = ".$_POST['record_id'];
		
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
	
	// close DB connection
	$conn->close();
	
?>