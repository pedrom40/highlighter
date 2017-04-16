<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
<script src="/js/client.js"></script>
<script>
	$(document).ready(function(e) {
		<?php
			if ($studentSelections->num_rows > 0) {
				while($row = $studentSelections->fetch_assoc()) {
					echo "loadSelections(".$row["id"].", ".$row["category_id"].", '".$row["selection_content"]."');";
				}
			}
		?>
	});
</script>