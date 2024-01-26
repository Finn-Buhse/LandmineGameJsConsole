var BoardModule = require("../Board.js");
var Board = BoardModule.Board;
var Player = BoardModule.Player;
describe("Player", function () {
    var mockBoard;
    var mockPlayer;

    function givenABoardWithWidthAndHeightEqualTo8() {
        mockBoard = new Board(8, 8);
    }

    function givenAPlayerIsCreatedWithXAndYEqualTo0() {
        mockPlayer = mockBoard.createPlayer(0, 0, 3);
    }

    function givenAPlayerIsCreatedWithXAndYEqualTo7() {
        mockPlayer = mockBoard.createPlayer(7, 7, 3);
    }

    it("can move up to the correct coordinate", function () {
        givenABoardWithWidthAndHeightEqualTo8();
        givenAPlayerIsCreatedWithXAndYEqualTo0();

        // When
        mockPlayer.move(Player.MovementDirection.Up);

        // Then
        expect(mockPlayer.x).toBe(0);
        expect(mockPlayer.y).toBe(1);
    });

    it("can move down to the correct coordinate", function () {
        givenABoardWithWidthAndHeightEqualTo8();
        givenAPlayerIsCreatedWithXAndYEqualTo7();

        // When
        mockPlayer.move(Player.MovementDirection.Down);

        // Then
        expect(mockPlayer.x).toBe(7);
        expect(mockPlayer.y).toBe(6);
    });

    it("can move left to the correct coordinate", function () {
        givenABoardWithWidthAndHeightEqualTo8();
        givenAPlayerIsCreatedWithXAndYEqualTo7();

        // When
        mockPlayer.move(Player.MovementDirection.Left);

        // Then
        expect(mockPlayer.x).toBe(6);
        expect(mockPlayer.y).toBe(7);
    });

    it("can move right to the correct coordinate", function () {
        givenABoardWithWidthAndHeightEqualTo8();
        givenAPlayerIsCreatedWithXAndYEqualTo0();

        // When
        mockPlayer.move(Player.MovementDirection.Right);

        // Then
        expect(mockPlayer.x).toBe(1);
        expect(mockPlayer.y).toBe(0);
    });

    it("cannot move up out of bounds", function () {
        givenABoardWithWidthAndHeightEqualTo8();
        givenAPlayerIsCreatedWithXAndYEqualTo7();

        // When
        mockPlayer.move(Player.MovementDirection.Up);

        // Then
        expect(mockPlayer.x).toBe(7);
        expect(mockPlayer.y).toBe(7);
    });

    it("cannot move down out of bounds", function () {
        givenABoardWithWidthAndHeightEqualTo8();
        givenAPlayerIsCreatedWithXAndYEqualTo0();

        // When
        mockPlayer.move(Player.MovementDirection.Down);

        // Then
        expect(mockPlayer.x).toBe(0);
        expect(mockPlayer.y).toBe(0);
    });

    it("cannot move left out of bounds", function () {
        givenABoardWithWidthAndHeightEqualTo8();
        givenAPlayerIsCreatedWithXAndYEqualTo0();

        // When
        mockPlayer.move(Player.MovementDirection.Left);

        // Then
        expect(mockPlayer.x).toBe(0);
        expect(mockPlayer.y).toBe(0);
    });

    it("cannot move right out of bounds", function () {
        givenABoardWithWidthAndHeightEqualTo8();
        givenAPlayerIsCreatedWithXAndYEqualTo7();

        // When
        mockPlayer.move(Player.MovementDirection.Right);

        // Then
        expect(mockPlayer.x).toBe(7);
        expect(mockPlayer.y).toBe(7);
    });

});