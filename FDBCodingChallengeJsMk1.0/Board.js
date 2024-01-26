var Player = require("./Player.js");

const BORDER_STRING = "|";

const BOARD_SQUARE_STRINGS = new Array(3); // This number should match the number of keys in 'Board.Squares'
BOARD_SQUARE_STRINGS[0] = "~ "; // Empty
BOARD_SQUARE_STRINGS[1] = "X "; // Mine
BOARD_SQUARE_STRINGS[2] = "+ "; // Life
class Board {
    static Square = {
        Empty: 0,
        Mine: 1,
        Life: 2
    };
    constructor(width, height) {
        this.width = width;
        this.height = height;

        this.boardArray = new Array(height);
        for (var i = 0; i < this.height; i++) {
            this.boardArray[i] = new Array(width);
            for (var j = 0; j < this.width; j++) {
                this.boardArray[i][j] = Board.Square.Empty;
            }
        }
    }

    createPlayer(startingX, startingY, startingLives) {
        return new Player(startingX, startingY, startingLives, this.width, this.height);
    }

    placeMine(x, y) {
        this.boardArray[this.boardArray.length - 1 - y][x] = Board.Square.Mine;
    }

    placeLife(x, y) {
        this.boardArray[this.boardArray.length - 1 - y][x] = Board.Square.Life;
    }

    resetSquare(x, y) {
        this.boardArray[this.boardArray.length - 1 - y][x] = Board.Square.Empty;
    }

    squareAt(x, y) {
        return this.boardArray[this.boardArray.length - 1 - y][x];
    }

    getDisplayString() {
        var displayString = "";
        for (var i = 0; i < this.height; i++)
        {
            var rowString = (this.height - i - 1).toString() + " " + BORDER_STRING; // Y axis and left border

            for (var j = 0; j < this.width; j++)
            {
                rowString += BOARD_SQUARE_STRINGS[this.boardArray[i][j]]; // this.boardArray[i][j] is 0 for an empty square, 1 for a mine, and 2 for a life
            }
            displayString += rowString + BORDER_STRING + "\n"; // Right border
        }

        // X axis
        displayString += "Y\n X ";
        for (var i = 0; i < this.width; i++)
        {
            displayString += i.toString();
            if (i != this.width - 1)
                displayString += " ";
        }

        return displayString;
    }
}

module.exports = {
    Board: Board,
    Player: Player
}