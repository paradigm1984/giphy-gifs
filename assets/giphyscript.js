$(document).ready(function() {

    /* ========================= VARIABLES ======================== */

    // API key in a var to reuse
    // dc6zaTOxFJmzC

    /* not sure if i needed to put the buttons i made in this array since
    im not clearing them but it cant hurt. new ones will be added here also.*/
    var animalCategories = ["Platypus", "Emu", "Honey Badger", "Turtle", "Koala"];

    /* ========================= FUNCTIONS ======================== */

    function startingButtons() {

    	// clears div
    	$("#buttonContainer").empty(); 

    	// adds a button/class/attribute/name for each item in the array.
        for (var i = 0; i < animalCategories.length; i++){
            var animalButton = $("<button>");
            animalButton.addClass("animal");
            animalButton.addClass("btn btn-primary")
            animalButton.attr("data-name", animalCategories[i]);
            animalButton.text(animalCategories[i]);
            $("#buttonContainer").append(animalButton);
        };
    };


    function addNewButton() {

        // on the click of the add critter button run this function
        $("#addCritter").on("click", function(){

            // a var called animal will equal the value the user typed  
            var animal = $("#animalInput").val().trim();

            /* if the animal they want is not an option, dont allow a button
            to be made */
            if (animal == ""){
             // return false;
              console.log(":(")
            } 
            // push the animal option into the animal array
            animalCategories.push(animal);


            // run the function to create the button for this new option
            startingButtons();
            console.log(animalCategories);
            return false;
        });

    };


    function displayGifs() {

        // in this function the variable's name is equal to its data name
        var animal = $(this).attr("data-name");

        /* querys the api with the array and the api key that were set
        as variables at the top of the program. cutting the search off
        at 10 */
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal
        + "&api_key=dc6zaTOxFJmzC&limit=10";

        // making the ajax call to giphy
        $.ajax ({
            url: queryURL,
            method: "GET"
        }).done(function(response) {

            //clears anything in the gif div
            $("#gifDump").empty()

            // a var called results will equal the response data
            var results = response.data;

            // if the results dont return anything, dont do anything
            if (results == ""){
              // so the page doesnt reload  
              return false;
            } 

            // for each result, do the following things...
            for (var i = 0; i < results.length; i++) {
                
                // 1. create a variable that equals a new div
                var gifDiv = $("<div>");

                // 2. give that div a class called gif-div
                gifDiv.addClass("gif-div");

                /* 3. creates a paragraph and pulls in the rating of each
                gif thats brought in. also puts teh rating into the
                gifDiv div */
                var gifRating = $("<p>").text("Rating: " + results[i].rating);
                gifDiv.append(gifRating);

                gifRating.addClass("gif-rating");

                /* 4. creates img tags that will contain both still and 
                animated GIF info for each gif thats brought in. */
                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height_still.url);
                gifImage.attr("data-still", results[i].images.fixed_height_still.url);
                gifImage.attr("data-animate", results[i].images.original.url);
                // sets the default state to still
                gifImage.attr("data-state", "still");
                // giving the img tags a class
                gifImage.addClass("div-img")
                // adding the imgs to the same div as the ratings
                gifDiv.append(gifImage);

                // dumps the gifs and their ratings to the tag in the html
                $("#gifDump").prepend(gifDiv);
            }
        })
    };

    /* loading in the initial buttons and button adding function
    when the page loads */
    startingButtons();
    addNewButton();

     /* =========================== LOGIC ========================== */

    // event listeners for clicking the gifs to animate / freeze
    /* i think you can do $("#gifDump").on("click" ...) so it
    doesnt bubble up through the DOM not that it matters in this
    case */

    $(document).on("click", ".animal", displayGifs);

    $(document).on("click", ".div-img", function(){
        var state = $(this).attr('data-state');
        if ( state == 'still'){
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        }else{
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });

});

