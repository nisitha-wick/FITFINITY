<!DOCTYPE html>
<html>
<head>
	<title>Feedback Form</title>
	<script>
		function validateForm() {
			var name = document.forms["feedback"]["name"].value;
			var email = document.forms["feedback"]["email"].value;
			var rating = document.forms["feedback"]["rating"].value;
			if (name == "" || email == "" || rating == "") {
				alert("Please fill in all required fields.");
				return false;
			}
			else {
				var comments = document.forms["feedback"]["comments"].value;
				var message = "Dear " + name + ", thank you very much for your feedback. You have rated our site as " + rating + ", and your comment was \"" + comments + "\".";
				alert(message);
				return true;
			}
		}
	</script>
</head>
<body>
	<form name="feedback" onsubmit="return validateForm()">
		<label for="name">Name:</label>
		<input type="text" id="name" name="name" required>
		<br>
		<label for="email">Email:</label>
		<input type="email" id="email" name="email" required>
		<br>
		<label for="comments">Comments:</label>
		<textarea id="comments" name="comments"></textarea>
		<br>
		<label for="rating">Rate this website:</label>
		<select id="rating" name="rating" required>
			<option value="">--Please select--</option>
			<option value="Excellent">Excellent</option>
			<option value="Good">Good</option>
			<option value="Fair">Fair</option>
			<option value="Poor">Poor</option>
		</select>
		<br>
		<input type="reset" value="Reset">
		<input type="submit" value="Submit">
	</form>
</body>
</html>
