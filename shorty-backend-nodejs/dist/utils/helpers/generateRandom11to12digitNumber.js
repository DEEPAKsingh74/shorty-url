"use strict";
// Generates a random 11 or 12 digit number.
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandom11to12DigitNumber = void 0;
const generateRandom11to12DigitNumber = () => {
    const min = 1e10;
    const max = 1e12 - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
exports.generateRandom11to12DigitNumber = generateRandom11to12DigitNumber;
