"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorBase = void 0;
class ErrorBase extends Error {
    constructor(message, code, details, fix) {
        super(message || "Internal Server Error");
        this.code = 500;
        this.code = code;
        this.details = details;
        this.fix = fix;
    }
}
exports.ErrorBase = ErrorBase;
