let gifButton = document.querySelector(".gif-button");
let search = document.getElementById("button-input");
var offset = 0;
var colors = [
  "rgb(255,102,102)",
  "rgb(0,255,153)",
  "rgb(0,204,255)",
  "rgb(255,243,92)",
  "rgb(153,51,255)"
];

//       ******* SEARCH GIFS *******
$("#add-button").on("click", function() {
  event.preventDefault();
  if (search.value.length > 0) {
    console.log("Added Button: " + search.value);
    //on click create button from input text
    var newButton = document.createElement("button");
    newButton.innerHTML = search.value;
    newButton.setAttribute("class", "gif-button");
    //random color picker
    newButton.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];
    $(".col").prepend(newButton);
  } else {
    console.log("Invalid Search");
  }
});

//       ******* CREATE GIFS *******
// Event listener for our gif-button
$(".col").on("click", ".gif-button", function() {
  // Storing our giphy API URL for random images
  var selection = this.innerHTML;
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    selection +
    "&api_key=3Ehu1I4sEu61pvmKpYtbNslNFGxntvAW&limit=10&offset=" +
    offset;
  offset += 10;
  // Perfoming an AJAX GET request to our queryURL
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    // After the data from the AJAX request comes back
    .then(function(response) {
      // storing the data from the AJAX request in the results variable
      var results = response.data;

      // Looping through each result item
      for (var i = 0; i < results.length; i++) {
        var div = $("<div>");
        var image = $("<img>");
        // Setting the Image src attribute to imageUrl
        image.attr("src", results[i].images.fixed_height_still.url);
        image.attr("alt", gifButton.innerHTML);
        image.attr("class", "gif");
        image.attr("data-state", "still");
        image.attr("data-still", results[i].images.fixed_height_still.url);
        image.attr("data-animate", results[i].images.fixed_height.url);
        div.append(image);
        // Prepending the image to the images div
        $(".images").prepend(div);
      }
    });
});

//animate on click
$(document).on("click", ".gif", function() {
  console.log("click");
  // The attr jQuery method allows us to get or set the
  // value of any attribute on our HTML element
  var state = $(this).attr("data-state");
  if (state === "still") {
    // If the clicked image's state is still,
    // update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    // Else set src to the data-still value
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});
