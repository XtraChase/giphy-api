let gifButton = document.querySelector(".gif-button").innerHTML;
let search = document.getElementById("button-input");

//       ******* SEARCH GIFS *******
$("#add-button").on("click", function() {
  event.preventDefault();
  //on click create button from input text
  var newButton = document.createElement("button");
  newButton.innerHTML = search.value;
  newButton.setAttribute("class", "gif-button");
  $(".col").prepend(newButton);
});

//       ******* CREATE GIFS *******
// Event listener for our gif-button
$(".gif-button").on("click", function() {
  // Storing our giphy API URL for random images
  let selection = this.innerHTML;
  let queryURL =
    "https://api.giphy.com/v1/gifs/random?api_key=3Ehu1I4sEu61pvmKpYtbNslNFGxntvAW&tag=" +
    selection;
  console.log(this);

  // Perfoming an AJAX GET request to our queryURL
  $.ajax({
    url: queryURL,
    method: "GET"
  })

    // After the data from the AJAX request comes back
    .then(function(response) {
      // Saving the image_original_url property
      var imageUrl = response.data.images.fixed_height.url;

      // Creating and storing an image tag
      var image = $("<img>" + "</br>" + "</br>");

      // Setting the Image src attribute to imageUrl
      image.attr("src", imageUrl);
      image.attr("alt", gifButton);
      image.attr("class", "gif");
      image.attr("data-state", "still");
      image.attr("data-still", response.data.images.fixed_height_still.url);
      image.attr("data-animate", response.data.images.fixed_height.url);

      // Prepending the image to the images div
      $(".images").prepend(image);
    });

  //animate on click
  //FIXME
  $(".images").on("click", function() {
    console.log("click");
    // The attr jQuery method allows us to get or set the
    // value of any attribute on our HTML element
    var state = $(".gif").attr("data-state");

    if (state === "still") {
      // If the clicked image's state is still,
      // update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      $(".gif").attr("src", $(".gif").attr("data-animate"));
      $(".gif").attr("data-state", "animate");
      console.log("animate");
    } else {
      // Else set src to the data-still value
      $(".gif").attr("src", $(".gif").attr("data-still"));
      $(".gif").attr("data-state", "still");
      console.log("still");
    }
  });
});
