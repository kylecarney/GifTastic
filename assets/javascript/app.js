//create variables of different topics
var topics = ["dog", "cat", "rabbit", "turtle", "fish", "squirrel", "deer", "skunk", "bear", "snake", "salamander"];
var animalBtn;
var animalImage;

var rating;

function renderButtons() {

  
  //Empty the buttons
  $("#buttons").empty();

  //Empty previously added animals
  $("#animal-input").val("");

  //Loop for topics to iterate
  for (var i=0; i < topics.length; i++) {
    //create a variable equal to button
    var animalBtn = $("<button>");

    //Add class for animalBtn
    animalBtn.addClass("animal-btn");

    //Data-attribute for animalBtn
    animalBtn.attr("data-animal", topics[i]);

    //Change names to the same as animalBtn
    animalBtn.text(topics[i]);

    //Append each animalBtn to button div
    $("#buttons").append(animalBtn);

    console.log(topics[i]);
  }
}

//Changes gif images when button is clicked by user
function displayImages() {

  //Clear previous images
  $("#gifs-appear-here").empty();
  $(".item").empty();



    var animal = $(this).attr("data-animal");
    console.log("this: " + this);
    console.log("animal: " + animal);

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=WtL7a88I6lDSvslFMP2JlDT1WvGXcUET&limit=25";

    
    $.ajax({
      url: queryURL,
      method: "GET"
    })

    
    .done(function(response) {

      console.log(response);
      
      var results = response.data;

      // 10 gifs 
      var x = 10;
      
      //Display 10 gifs each time button pressed
      for (var i = 0; i < x; i++) {
        console.log("results.length: " + results.length);
        //Variable with a div to put image and rating in
        var gifDiv = $("<div class='item float-left'>");

        //variable for rating of specific gif
        var rating = results[i].rating;

        //Do not display r or pg 13 rated images 
        if (rating !== "r" && rating !== "pg-13") {
          //Rating on html in paragraph
          var p = $("<p>").text("Rating: " + rating);

          //Variable called animalImage in image element
          var animalImage = $("<img>");

          //animalImage src and image information
          animalImage.attr("src", results[i].images.fixed_height_still.url);

          //animalImage data-state info to allow image in still state
          animalImage.attr("data-state", "still");

          //give animalImage data-still image information to allow image to be in still state
          animalImage.attr("data-still", results[i].images.fixed_height_still.url);

          //give animalImage data-animate image information so when clicked it will play gif
          animalImage.attr("data-animate", results[i].images.fixed_height.url);

          //add a class to animalImage
          animalImage.addClass("gif");


          //for each image/paragraph prepend to div 
          gifDiv.prepend(animalImage);
          gifDiv.prepend(p);


          //put image and image div on browser
          $("#gifs-appear-here").prepend(gifDiv);

  
          
        }

        //if r or pg-13 rating go back to beginning of loop and get another gif and add another to x, so we get a total of 10 gifs
        else {
          x++;
        }

          
      }

      //Click function to play gif
      $(".gif").on("click", function() {

        var state = $(this).attr("data-state");

        if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
        }

        else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
        }
      });
    });
  
  }


//this allows user to add new animal to list
$("#add-animal").on("click", function(event) {
  //event.preventDefault() prevents the form from trying to submit itself
  //form used so that the user can hit enter instead of clicking the button if they want
  event.preventDefault();

  //grab the text from the input box and trim any extra spaces entered
  var newTopic = $("#animal-input").val().trim();

  //takes animal entered from the textbox and adds it to our array of topics
  topics.push(newTopic);

  // call renderButtons which handles the processing of topics
  renderButtons();

});

//renderButtons function called to display the initial list of animals
renderButtons();

// click event on the animal-btn to listen for which animal user pics
$(document).on("click", ".animal-btn", displayImages);