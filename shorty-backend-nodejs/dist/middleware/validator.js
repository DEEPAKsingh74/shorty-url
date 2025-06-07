"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const ErrorStatus_1 = require("../utils/error_handler/ErrorStatus");
const validate = (schema) => (req, _res, next) => {
    try {
        console.log("req.body: ", req.body);
        schema.parse(req.body);
        next();
    }
    catch (error) {
        const details = error.errors.map((err) => (err.message));
        const errorRes = new ErrorStatus_1.BadRequestError("Invalid input", details, "Do not modify inputs, refresh and try again.");
        next(errorRes);
    }
};
exports.validate = validate;
