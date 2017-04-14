<?php
	
	// set DB connection
	require '/includes/db-connection.php';
	
	// insert statement (not currently accounting for security from attacks)
	$sql = 	"INSERT INTO e2l.challenge_briefs_student_selections (student_id, cb_id, category_id, selection_content)".
					"VALUES (".$_POST['student_id'].", ".$_POST['cb_id'].", ".$_POST['category_id'].", '".$_POST['selection_content']."')";
	
	// if insert worked
	if ($conn->query($sql) === TRUE) {
		
		// return new ID of record
		echo "New record created successfully";
		
	}
	
	// if it didn't
	else {
		echo "Error: " . $sql . "<br>" . $conn->error;
	}
	
	// close DB connection
	$conn->close();
	
?>