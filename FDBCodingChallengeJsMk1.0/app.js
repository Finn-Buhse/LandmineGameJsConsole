'use strict';
// Setup Jasmine
var Jasmine = require('jasmine');
var jasmine = new Jasmine();

jasmine.loadConfigFile('spec/support/jasmine.json');

// Main program
var LandmineGame = require("./LandmineGame.js");
var BoardModule = require("./Board.js");
var Player = BoardModule.Player;

const prompt = require("prompt-sync")();

var landmineGame = new LandmineGame();

// Optional code to set the board's width and height according to user input
var widthHeight = getBoardWidthAndHeightFromInput();
landmineGame.setBoardWidthHeightInitialiseHints(widthHeight[0], widthHeight[1]);

landmineGame.initialise();

while (true)
{
    landmineGame.processFrame();
    console.log(landmineGame.getFrameDisplayString());

    if (landmineGame.shouldEnd())
        break;

    movePlayerFromInput(landmineGame);
}

// Infinite loop prevent the application from terminating immedietly
while (true) {

}

// CONSOLE FUNCTIONS
function getBoardWidthAndHeightFromInput()
{
    var widthHeight = new Array(2);
    console.log("Would you like to choose the game's board width and height (default values are 8)?");
    while (true) {
        var answerString = prompt("Enter 'Y' for (Y)es, or 'N' for (N)o: ");
        if (answerString != null) {
            if (answerString == "Y") {
                widthHeight[0] = getBoardDimensionFromInput("width");
                widthHeight[1] = getBoardDimensionFromInput("height");
                break;
            }
            else if (answerString == "N") {
                widthHeight[0] = 8;
                widthHeight[1] = 8;
                break;
            }
            else {
                console.log("Input was not a given option. Please try again and enter one of the given options.");
            }
        }
        else {
            console.log("No input detected. Please try again and enter one of the given options.");
        }
    }
    return widthHeight;
}

function getBoardDimensionFromInput(dimensionName)
{
    while (true) {
        var dimensionString = prompt("Enter the board " + dimensionName + " (10 max): ");
        if (dimensionString != null) {
            try {
                var dimension = parseInt(dimensionString, 10);
                if (dimension > 0 && dimension <= 10) {
                    return dimension;
                }
                else {
                    console.log("Input must be greater than zero and less than or equal to 10. Please try again.");
                }
            }
            catch
            {
                console.log("Input was not an integer. Please try again and enter an integer input.");
            }
        }
        else {
            console.log("No input detected. Please try again and enter an integer input.");
        }
    }
}

function movePlayerFromInput(game) {
    while (true) {
        console.log("You may move the player Up (U), Down (D), Left (L), or Right (R)");
        var chosenDirectionString = prompt("Enter the letter corresponding to the direction you want to move the player: ");
        if (chosenDirectionString != null) {
            if (chosenDirectionString == "U") {
                game.movePlayer(Player.MovementDirection.Up);
                break;
            }
            else if (chosenDirectionString == "D") {
                game.movePlayer(Player.MovementDirection.Down);
                break;
            }
            else if (chosenDirectionString == "L") {
                game.movePlayer(Player.MovementDirection.Left);
                break;
            }
            else if (chosenDirectionString == "R") {
                game.movePlayer(Player.MovementDirection.Right);
                break;
            }
            else {
                console.log("Input was not one of the given options. Please retry and enter one of the given options.");
            }
        }
        else {
            console.log("No input detected. Please retry and enter one of the given options.");
        }
    }
}