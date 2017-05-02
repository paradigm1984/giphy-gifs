$(document).ready(function) {

/* ========================= VARIABLES ======================== */

// API key in a var to reuse
var authKey = "dc6zaTOxFJmzC";

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
          return false;
        } 
        // push the animal option into the animal array
        animalCategories.push(animal);

        // run the function to create the button for this new option
        startingButtons();
        return false;
    });

};


function displayGifs() {

    // in this function the variable's name is equal to its data name
    var animal = $(this).attr("data-name");

    /* querys the api with the array and the api key that were set
    as variables at the top of the program. cutting the search off
    at 10 */
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animalCategories
    + "&api_key=" + authKey + "&limit=10";

    console.log(queryURL);

    // making the ajax call to giphy
    $.ajax ({
        url: queryURL,
        method: "GET",

    }).done(function(response) {

        console.log(response);

        //clears anything in the gif div
        $("#gifDump").empty()

        // a var called results will equal the response data
        var results = response.data;

        // if the results dont return anything, dont do anything
        if (results == ""){
          return false;
        } 

        // for each result, do the following things...
        for (var i = 0; i < results.length; i++) {
            
            // 1. create a variable that equals a new div
            var gifDiv = $("<div>");

            // 2. give that div a class called gif-div
            gifDiv.addClass("gif-div");


        }
    })



};





};