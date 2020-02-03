// Create array with actors and actresses
var topics = [
    "channing tatum",
    "johnny depp",
    "margot robbie",
    "ryan gosling",
    "brad pitt",
    "matt damon",
    "will smith",
    "chris hemsworth",
    "tom hiddleston",
    "leonardo dicaprio",
    "tom holland",
    "tom hanks",
    "robert de niro"
];

// Loop that appends a button for each string
for(i = 0; i < topics.length; i++){
    var button = $("<button>").text(topics[i]);
    button.attr("data-actor", topics[i]);
    button.addClass("actor-button");
    $("#button-group").append(button);
}

// On click function for creating new buttons
$("#add-actor-button").on("click", function(e){
    e.preventDefault();
    var alreadyMade = false;
    if(topics.indexOf($("#new-actor-input").val()) !== -1) {
		alreadyMade = true;
    }
    if($("#new-actor-input").val() !== "" && alreadyMade === false){
        var newActor = $("#new-actor-input").val().toLowerCase();
        topics.push(newActor);
        var button = $("<button>").text(newActor);
        button.attr("data-actor", newActor);
        button.addClass("actor-button");
        $("#button-group").append(button);
    }
    $("#new-actor-input").val("");
});

// On click function to display Giphy
$(document).on("click", ".actor-button", function(){
    var actor = $(this).attr("data-actor");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    actor + "&api_key=btEcUR8CcmUasXDWU2Ut7EwNDVh9EuMW&limit=10";
    $(".results-container").empty();

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        var results = response.data;
        var resultsContainer = $("<section class='results-container'>");
        
        for(i = 0; i < results.length; i++) {
            var resultDiv = $("<div class='result-container'>");
            var rating = results[i].rating;
            var ratingText = $("<p>").text("Rating: " + rating);
            var actorGiphy = $("<img class='result'>");
            actorGiphy.attr("src", results[i].images.fixed_height_still.url);
    		actorGiphy.attr("data-state", "still");
    		actorGiphy.attr("data-still", results[i].images.fixed_height_still.url);
            actorGiphy.attr("data-animate", results[i].images.fixed_height.url);
            resultDiv.prepend(actorGiphy);
            resultDiv.prepend(ratingText);
            resultsContainer.prepend(resultDiv);
        }
        $("#actor-group").prepend(resultsContainer);
    });
});

// Move or stop gifs on click
$(document).on("click", ".result", function() {
	var state = $(this).attr("data-state");

	if(state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});
