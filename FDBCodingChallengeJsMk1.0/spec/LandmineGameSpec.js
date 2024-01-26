const LandmineGame = require("../LandmineGame.js");
const BoardModule = require("../Board.js");
const Board = BoardModule.Board;
const Player = BoardModule.Player;

describe("LandmineGame", function () {
    var mockLandmineGame;

    function givenALandmineGame()
    {
        mockLandmineGame = new LandmineGame();
        mockLandmineGame.initialise();
    }

    function givenPlayerHitsAMineAndIsBelowTheTopRow() {
        // Mocks the sequence of actions that would occurr in game loop
        // - Game first processes player status
        // - Followed by moving the player in the direction given by user

        expect(mockLandmineGame.processPlayerStatus(Board.Square.Mine)).toBe(LandmineGame.PlayerStatus.Alive);
        mockLandmineGame.player.move(Player.MovementDirection.Up);
        expect(mockLandmineGame.processPlayerStatus(Board.Square.Empty)).toBe(LandmineGame.PlayerStatus.Alive);
        mockLandmineGame.player.move(Player.MovementDirection.Up);
        expect(mockLandmineGame.processPlayerStatus(Board.Square.Empty)).toBe(LandmineGame.PlayerStatus.Alive);
        mockLandmineGame.player.move(Player.MovementDirection.Up);
        expect(mockLandmineGame.processPlayerStatus(Board.Square.Empty)).toBe(LandmineGame.PlayerStatus.Alive);
        mockLandmineGame.player.move(Player.MovementDirection.Up);
        expect(mockLandmineGame.processPlayerStatus(Board.Square.Empty)).toBe(LandmineGame.PlayerStatus.Alive);
        mockLandmineGame.player.move(Player.MovementDirection.Up);
        expect(mockLandmineGame.processPlayerStatus(Board.Square.Empty)).toBe(LandmineGame.PlayerStatus.Alive);
        mockLandmineGame.player.move(Player.MovementDirection.Up);
        expect(mockLandmineGame.processPlayerStatus(Board.Square.Empty)).toBe(LandmineGame.PlayerStatus.Alive);
    }

    function givenPlayerHitsAMine() {
        mockLandmineGame.processPlayerStatus(Board.Square.Mine);
    }

    function givenAMineIsPlacedAtXAndYEquals0() {
        mockLandmineGame.board.placeMine(0, 0);
    }

    function whenUpdateGameIsCalled() {
        mockLandmineGame.updateGame();
    }

    function whenPlayerMovesUp() {
        mockLandmineGame.player.move(Player.MovementDirection.Up);
    }

    function thenIfPlayerHitsASecondMinePlayerStatusReturnsWon() {
        expect(mockLandmineGame.processPlayerStatus(Board.Square.Mine)).toBe(LandmineGame.PlayerStatus.Won);
    }

    function thenIfPlayerHitsAThirdMinePlayerStatusReturnsLost() {
        expect(mockLandmineGame.processPlayerStatus(Board.Square.Mine)).toBe(LandmineGame.PlayerStatus.Lost);
    }

    function thenTheBoardSquareIsEmpty() {
        expect(mockLandmineGame.board.squareAt(0, 0)).toBe(Board.Square.Empty);
    }

    it("can correctly determine when the player has won", function () {
        givenALandmineGame();
        givenPlayerHitsAMineAndIsBelowTheTopRow();

        whenPlayerMovesUp();

        thenIfPlayerHitsASecondMinePlayerStatusReturnsWon();
    });

    it("can correctly determine when the player has lost", function () {
        givenALandmineGame();
        givenPlayerHitsAMineAndIsBelowTheTopRow();
        givenPlayerHitsAMine();

        whenPlayerMovesUp();

        thenIfPlayerHitsAThirdMinePlayerStatusReturnsLost();
    });

    it("can correctly update the board", function () {
        givenALandmineGame(); // Player at (0, 0) by default
        givenAMineIsPlacedAtXAndYEquals0();

        whenUpdateGameIsCalled();

        thenTheBoardSquareIsEmpty();
    });

});