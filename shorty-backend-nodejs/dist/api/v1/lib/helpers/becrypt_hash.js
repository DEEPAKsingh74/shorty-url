"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareHash = exports.hashString = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
/**
 * Hashes a plain-text password using bcrypt.
 * @param password - The plain-text password to hash.
 * @returns The hashed password as a string.
 */
const hashString = async (password) => {
    const saltRounds = 12;
    const hashed = await bcryptjs_1.default.hash(password, saltRounds);
    return hashed;
};
exports.hashString = hashString;
const compareHash = async (plainPassword, hashedPassword) => {
    return await bcryptjs_1.default.compare(plainPassword, hashedPassword);
};
exports.compareHash = compareHash;
