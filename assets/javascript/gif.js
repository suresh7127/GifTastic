
var topics = ["Cats", "Dogs", "Cows", "Lions","Tigers", "Elephants", "Bulls", "Hourses","Crows", "Pigs", "Rats", "Rabbits"];
function renderButtons(){
	for(var i = 0; i < topics.length; i++) {
		var newButton = $("<button>");
		newButton.addClass("btn");
		newButton.addClass("animal-button");
		newButton.text(topics[i]);
		$("#button-container").append(newButton);
	}
	$(".animal-button").unbind("click");

	$(".animal-button").on("click", function(){
		$(".gif-image").unbind("click");
		$("#gif-container").empty();
		$("#gif-container").removeClass("solid-border");
		populateGIFContainer($(this).text());
	});

}

function addButton(animal){
	if(topics.indexOf(animal) === -1) {
		topics.push(animal);
		$("#button-container").empty();
		renderButtons();
	}
}

function populateGIFContainer(animal){
	$.ajax({
		url: "https://api.giphy.com/v1/gifs/search?api_key=a6buS4cX72zbV9E4RwoxtBAabpHQuQi7&q="+animal+"&limit=10&offset=0&rating=PG&lang=en",
		method: "GET"
	}).then(function(response){
		response.data.forEach(function(element){
			newDiv = $("<div>");
			newDiv.addClass("individual-gif-container");
			newDiv.append("<p>Rating: " + element.rating.toUpperCase() + "</p>");
			var newImage = $("<img src = '" + element.images.fixed_height_still.url + "'>");
			newImage.addClass("gif-image");
			newImage.attr("state", "still");
			newImage.attr("still-data", element.images.fixed_height_still.url);
			newImage.attr("animated-data", element.images.fixed_height.url);
			newDiv.append(newImage);
			$("#gif-container").append(newDiv);
		});
		
		$("#gif-container").addClass("solid-border");
		$(".gif-image").unbind("click");
		$(".gif-image").on("click", function(){
			if($(this).attr("state") === "still") {
				$(this).attr("state", "animated");
				$(this).attr("src", $(this).attr("animated-data"));
			}
			else {
				$(this).attr("state", "still");
				$(this).attr("src", $(this).attr("still-data"));
			}
		});
	});
}

$(document).ready(function(){
	renderButtons();
	$("#submit").on("click", function(){
		event.preventDefault();
		addButton($("#animal-gif").val().trim());
		$("#animal-gif").val("");
	});
});