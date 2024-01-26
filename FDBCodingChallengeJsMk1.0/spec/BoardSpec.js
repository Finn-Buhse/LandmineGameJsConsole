var BoardModule = require("../Board.js");
var Board = BoardModule.Board;
var Player = BoardModule.Player;

describe("Board", function () {
    // Mine coordinates are:
    // (0, 0)
    // (7, 7)
    // (2, 5)
    // (6, 4) 
    var PLACED_MINES_BOARD_DISPLAY_STRING = "7 |~ ~ ~ ~ ~ ~ ~ X |\n6 |~ ~ ~ ~ ~ ~ ~ ~ |\n5 |~ ~ X ~ ~ ~ ~ ~ |\n4 |~ ~ ~ ~ ~ ~ X ~ |\n3 |~ ~ ~ ~ ~ ~ ~ ~ |\n2 |~ ~ ~ ~ ~ ~ ~ ~ |\n1 |~ ~ ~ ~ ~ ~ ~ ~ |\n0 |X ~ ~ ~ ~ ~ ~ ~ |\nY\n X 0 1 2 3 4 5 6 7";

    var mockBoard;

    it("has array with length equal to given height containing arrays with lengths equal to given width", function () {
        // When
        mockBoard = new Board(8, 8);

        // Then
        expect(mockBoard.boardArray.length).toBe(8);
        for (var i = 0; i < 8; i++) {
            expect(mockBoard.boardArray[i].length).toBe(8);
        }
    });

    it("is empty when first created", function () {
        // When
        mockBoard = new Board(8, 8);

        // Then
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                expect(mockBoard.boardArray[i][j]).toBe(Board.Square.Empty);
            }
        }
    });

    it("can place a mine at specific coordinates", function () {
        // Given
        mockBoard = new Board(8, 8);

        // When
        mockBoard.placeMine(0, 7);

        // Then
        expect(mockBoard.boardArray[0][0]).toBe(Board.Square.Mine);
    });

    it("can place a life at specific coordinates", function () {
        // Given
        mockBoard = new Board(8, 8);

        // When
        mockBoard.placeLife(0, 7);

        // Then
        expect(mockBoard.boardArray[0][0]).toBe(Board.Square.Life);
    });

    it("correctly returns the value of the square at specific coordinates", function () {
        // Given
        mockBoard = new Board(8, 8);
        mockBoard.placeMine(0, 7);

        // When
        var square = mockBoard.squareAt(0, 7);

        // Then
        expect(square).toBe(Board.Square.Mine);
    });

    it("correctly returns the board display string", function () {
        // Given
        mockBoard = new Board(8, 8);
        mockBoard.placeMine(0, 0);
        mockBoard.placeMine(7, 7);
        mockBoard.placeMine(2, 5);
        mockBoard.placeMine(6, 4);

        // When
        var displayString = mockBoard.getDisplayString();

        // Then
        expect(displayString).toBe(PLACED_MINES_BOARD_DISPLAY_STRING);
    })
});