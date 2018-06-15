$(document).ready(function () {
	
	var data = {};
	data.name = "zoe";
	data.age = 25;





	$.ajax({
		type: "POST",
        url: "Client/AddClient",
		dataType: "json",
		data: JSON.stringify(data),
		contentType: "application/json; charset=utf-8",
		success: function (data) {
			alert(data);
		},
		error: function () {
			alert("Error loading data! Please try again.");
		}
	});
});