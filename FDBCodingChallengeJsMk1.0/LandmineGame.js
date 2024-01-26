var BoardModule = require("./Board.js");
var Board = BoardModule.Board;
var Player = BoardModule.Player;

var RandomGenerator = require("./RandomGenerator.js");

class LandmineGame {
    boardHeight;
    boardWidth;
    randomGenerator;
    board;
    player;
    lastFrameGameInfo;

    constructor() {
        this.boardWidth = 8;
        this.boardHeight = 8;

        this.randomGenerator = new RandomGenerator();
    }

    setBoardWidthHeightInitialiseHints(boardWidth, boardHeight) {
        this.boardWidth = boardWidth;
        this.boardHeight = boardHeight;
    }

    initialise() {
        this.board = new Board(this.boardWidth, this.boardHeight);
        this.player = this.board.createPlayer(0, 0, 3);

        this.placeRandomMinesAndLives();
    }

    placeRandomMinesAndLives() {
        for (var x = 0; x < this.board.width; x++)
        {
            for (var y = 0; y < this.board.height; y++)
            {
                    // Value can be 0, 1, or 2, giving
                    // a 1/3 probability of the square being empty
                    // a 1/3 probability of the square having a mine
                    // a 1/3 probability of the square having a life
                    var randomInt = this.randomGenerator.getRandomInt(0, 3);

                // 0 corressponds to an empty square. No action is required in this case since the board starts with empty squares
                if (randomInt == 1) {
                    this.board.placeMine(x, y);
                }
                else if (randomInt == 2) {
                    this.board.placeLife(x, y);
                }
            }
        }
    }

    movePlayer(movementDirection) {
        this.player.move(movementDirection);
    }

    processFrame() {
        this.lastFrameGameInfo = this.updateGame();
    }

    getFrameDisplayString() {
        return this.generateFrameDisplayString(this.lastFrameGameInfo);
    }

    shouldEnd() {
        if (this.lastFrameGameInfo == undefined)
            return false;
        return this.lastFrameGameInfo.playerStatus != LandmineGame.PlayerStatus.Alive;
    }

    static PlayerStatus = {
        Alive: 0,
        Lost: 1,
        Won: 2
    }

    processPlayerStatus(playerVisitedSquare) {
        if (playerVisitedSquare == Board.Square.Mine) {
            this.player.deductLife();
            if (this.player.isDead()) {
                return LandmineGame.PlayerStatus.Lost;
            }
        }
        else if (playerVisitedSquare == Board.Square.Life) {
            this.player.addLife();
        }

        if (this.player.y == this.board.height - 1) {
            return LandmineGame.PlayerStatus.Won;
        }

        return LandmineGame.PlayerStatus.Alive;
    }

    updateGame() {
        var gameInfo = {};

        gameInfo.playerVisitedSquare = this.board.squareAt(this.player.x, this.player.y);

        gameInfo.playerStatus = this.processPlayerStatus(gameInfo.playerVisitedSquare);

        if (gameInfo.playerVisitedSquare != Board.Square.Empty) {
            this.board.resetSquare(this.player.x, this.player.y);
        }

        return gameInfo;
    }

    generateFrameDisplayString(gameInfo) {
        var displayString = "";
        if (gameInfo.playerStatus == LandmineGame.PlayerStatus.Won) {
            displayString += "You won!";
        }
        else if (gameInfo.playerStatus == LandmineGame.PlayerStatus.Lost) {
            displayString += "You hit 3 mines! Game over!";
        }
        else {
            displayString +=
                "Board:\n" + this.board.getDisplayString() +
                "\nPlayer coordinates: (" + this.player.x.toString() + ", " + this.player.y.toString() + ")\n" +
                (gameInfo.playerVisitedSquare == Board.Square.Mine ? "You hit a mine!" : "You did not hit any mines.");
        }
        return displayString;
    }
}

module.exports = LandmineGame;