class RandomGenerator {
    constructor() {
        this.seed = Date.now();
        this.getRandomFloat = this.createRng(this.seed);
    }

    // Custom psuedo random generator. Works by using 'static' constants m and a, as well as the 'static' variable s, which changes based on itself upon each execution of the function.
    // This gives the illusion of random numbers.
    // From https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript#:~:text=It's%20not%20possible%20to%20seed,integers%20less%20than%202%5E53
    // Neccessary because the default random function uses the same seed for each run of the application
    createRng(seed) {
        const m = 2 ** 35 - 31;
        const a = 185852;
        var s = seed % m;
        return function () {
            return (s = s * a % m) / m
        }
    }

    /* Added in constructor - returns random float from 0.0 inclusive up to 1.0 non-inclusive
    getRandomFloat() {}
    */

    getRandomInt(inclusiveMinimum, exlusiveMaximum) {
        return Math.floor(this.getRandomFloat() * (exlusiveMaximum - inclusiveMinimum)) + inclusiveMinimum;
    }
}

module.exports = RandomGenerator;