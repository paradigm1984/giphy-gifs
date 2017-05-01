$(document).ready(function) {

/* ========================= VARIABLES ======================== */

// API key in a var to reuse
var authKey = "dc6zaTOxFJmzC";

/* not sure if i needed to put the buttons i made in this array since
im not clearing them but it cant hurt. new ones will be added here also.*/
var animalCategories = ["Platypus", "Emu", "Honey Badger", "Turtle", "Koala"];

function startingButtons() {
	// clears div
	$("#buttonContainer").empty(); 

	// adds a button/class/attribute/name for each category in the array.
    for (var i = 0; i < animalCategories.length; i++){
        var gifButton = $("<button>");
        gifButton.addClass("action");
        gifButton.addClass("btn btn-primary")
        gifButton.attr("data-name", animalCategories[i]);
        gifButton.text(animalCategories[i]);
        $("#buttonContainer").append(gifButton);
    };
};


function addNewButton(){
    
};







};