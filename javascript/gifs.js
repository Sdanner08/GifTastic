//gif array to hold the searched items
var gifArr = ["Cats", "Dogs", "Honey Badger"];

//Gify API key RzQ7p2y84zwuGxx0BiSLt4GtPC5Siipl
//Ajax pull
function displaygifs() {

    var gif = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=dc6zaTOxFJmzC&limit=10";

    // Creating an AJAX call
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        var results = response.data;
        //for loop to put all the images in to a thumbnail for display
        for (var i = 0; i< results.length; i++){
            var gifDiv = $("<div>")
              gifDiv.attr({
                class: "card d-inline-block m-2",
                style: "width: 250px;",
              });
              //Displays the rating of the gif
            var rating = results[i].rating;
            var pOne = $("<p>").text("Rating: " + rating);
            gifDiv.append(pOne);

            //tells the computer which gif source 
            var image = $("<img>")
              image.attr({
                src: results[i].images.original.url,
                class: "card-img-top stillGif",
                dataState: "still"
            });
            //appends the image
            gifDiv.append(image);
            //puts a favorite buttons
            var starButt = $("<button>").text("Favorite!");
            //tells the button how to look
            starButt.attr({
              type: "button",
              class:"btn btn-primary",
              id: "likIt"
            });
            gifDiv.append(starButt);

            $("#gifs-appear-here").prepend(gifDiv);
            console.log(response);
        }
    })
};
//cant get the image to go from still to animated gifs to work. this is the code for where I got
$(".stillGif").on("click", function() {

  var state = $(this).attr("dataState");
  var animate = results[i].images.original.url;
  var still = results[i].images.original_still.url;

  if (state === "still") {
    $(this).attr("src", $(this).attr("animate"));
    $(this).attr("dataState", "animate");
  } else {
    $(this).attr("src", $(this).attr("still"));
    $(this).attr("dataState", "still");
  }
});

//the start to get the favorite buttons to push the gif to the favoite drop down.
var favArr =[];
$("likeIt").on("click", function(event){
  event.preventDefault();
})


//creates buttons from the search area.
 function renderButtons() {
    $("#buttons-view").empty();
    for (var i = 0; i <gifArr.length; i++) {
      var a = $("<button>");
      a.addClass("gif-btn");
      a.attr("data-name", gifArr[i]);
      a.text(gifArr[i]);
      $("#buttons-view").append(a);
    }
  }

  $("#gifSearch").on("click", function(event) {
    event.preventDefault();
    if ($("#search").val() != ""){
  var gifSeaAra = $("#search").val().trim();
  gifArr.push(gifSeaAra);
  renderButtons();
  localStorage.setItem("recent", gifArr);
    }
  });

  $("body").on("click", ".gif-btn", displaygifs);
  $("#buttons-view").text(localStorage.getItem("recent"));

  renderButtons();
console.log(gifArr);
