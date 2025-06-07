"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.numberSequencer = exports.CHAR_SEQUENCE = void 0;
exports.CHAR_SEQUENCE = "S0aMNbcRLdTKefJgIhi8QjklO9E61mUF7DnPo24GZp5qHrVsAt3YuCWvBwxXyz";
const numberSequencer = (num) => {
    let encoding = "";
    const base = exports.CHAR_SEQUENCE.length;
    while (num > 0) {
        const index = num % base;
        encoding = exports.CHAR_SEQUENCE[index] + encoding;
        num = Math.floor(num / base);
    }
    return encoding.padStart(6, exports.CHAR_SEQUENCE[0]);
};
exports.numberSequencer = numberSequencer;
