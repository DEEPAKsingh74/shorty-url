// Generates a random 11 or 12 digit number.

export const generateRandom11to12DigitNumber = (): number => {
    const min = 1e10;
    const max = 1e12-1;

    return Math.floor(Math.random() * (max - min + 1)) + min;
}