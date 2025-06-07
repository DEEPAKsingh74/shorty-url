"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.numberDesequencer = void 0;
const numberSequencer_1 = require("./numberSequencer");
const BASE = numberSequencer_1.CHAR_SEQUENCE.length;
const numberDesequencer = (str) => {
    let num = 0;
    for (let i = 0; i < str.length; i++) {
        const index = numberSequencer_1.CHAR_SEQUENCE.indexOf(str[i]);
        if (index === -1)
            throw new Error(`Invalid character '${str[i]}'`);
        num = num * BASE + index;
    }
    return num;
};
exports.numberDesequencer = numberDesequencer;
