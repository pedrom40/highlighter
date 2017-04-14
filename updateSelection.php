<?php
	
	// set DB connection
	require '/includes/db-connection.php';
	
	// insert statement (not currently accounting for security from attacks)
	$sql = 	"UPDATE e2l.challenge_briefs_student_selections ".
					"SET ".
						"selection_content = '".$_POST['selection_content']."',".
						"category_id = ".$_POST['category_id'].
					"WHERE student_id = ".$_POST['student_id'].
						"AND cb_id = ".$_POST['cb_id'];
	
	// if insert worked
	if ($conn->query($sql) === TRUE) {
		echo "Record updated successfully";
	}
	
	// if it didn't
	else {
		echo "Error: " . $sql . "<br>" . $conn->error;
	}
	
	// close DB connection
	$conn->close();
	
?>