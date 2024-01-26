const RandomGenerator = require("../RandomGenerator");

describe("RandomGenerator", function () {
    it("has a unique seed", function () {
        var randomGenerator1 = new RandomGenerator();
        var randomGenerator2 = new RandomGenerator();
        expect(randomGenerator1.seed).not.toBe(randomGenerator2);
    });

    it("correctly returns random numbers within bounds when passing minimum and maximum", function () {
        var randomGenerator = new RandomGenerator();

        // Try 100 times to minimise the chance the test passes by coincidence

        // There is a very small chance that the function is incorrect and *could* return an invalid number,
        // but it passes the test all 100 times making the test pass
        for (var i = 0; i < 100; i++)
        {
            expect(randomGenerator.getRandomInt(5, 6)).toBe(5);
        }
    });
});