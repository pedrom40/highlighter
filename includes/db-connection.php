<?php
	
	$hostname = "mysql21.ezhostingserver.com";
	$username = "e2l_user";
	$password = "N@tPr1nT";
	$dbname 	= "e2l";
	
	// Create connection
	$conn = new mysqli($hostname, $username, $password, $dbname);
	
	// Check connection
	if ($conn->connect_error){
		die("Connection failed: " . $conn->connect_error);
	}
	
?>