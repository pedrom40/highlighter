<?php
	
	// set DB connection
	require '/includes/db-connection.php';
	
	// if inserting new record
	if ($_POST['action'] == 'insert'){
		
		// insert statement (need to learn how to use TRANSACTIONS with PHP, need to sanitize form values)
		$sql = 	"INSERT INTO e2l.challenge_briefs_student_selections (student_id, cb_id, category_id, selection_content)".
						"VALUES (".$_POST['student_id'].", ".$_POST['cb_id'].", ".$_POST['category_id'].", '".$_POST['selection_content']."')";
		
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
		$sql = 	"UPDATE e2l.challenge_briefs_student_selections SET ".
						"student_id = ".$_POST['student_id'].",".
						"cb_id = ".$_POST['cb_id'].",".
						"category_id = ".$_POST['category_id'].",".
						"selection_content = '".$_POST['selection_content']."' ".
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