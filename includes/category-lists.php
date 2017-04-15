<?php
	
	// output data of each row
	while($row = $categories1->fetch_assoc()) {
		
		echo '<dl id="category'.$row["id"].'">';
			echo '<dd class="categoryName">'.$row["category_name"].' <span class="glyphicon glyphicon-menu-right" aria-hidden="true"></span></dd>';
		echo '</dl>';
		
	}
	
?>