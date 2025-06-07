"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConflictError = exports.InternalServerError = exports.ForbiddenError = exports.UnauthorizedError = exports.BadRequestError = exports.NotFoundError = void 0;
const ErrorBase_1 = require("./ErrorBase");
/**
 * NotFoundError (404)
 * - Used when a requested resource (e.g., a user, product, or page) is not found in the database.
 * - Example: Fetching a user by ID that does not exist.
 */
class NotFoundError extends ErrorBase_1.ErrorBase {
    constructor(message = 'Not Found', details, fix) {
        super(message, 404, details, fix);
    }
}
exports.NotFoundError = NotFoundError;
/**
 * BadRequestError (400)
 * - Used when the client sends an invalid request (e.g., missing required fields, invalid data format).
 * - Example: A form submission with missing required fields.
 */
class BadRequestError extends ErrorBase_1.ErrorBase {
    constructor(message = 'Bad Request', details, fix) {
        super(message, 400, details, fix);
    }
}
exports.BadRequestError = BadRequestError;
/**
 * UnauthorizedError (401)
 * - Used when authentication is required but not provided or invalid.
 * - Example: Accessing a protected route without a valid authentication token.
 */
class UnauthorizedError extends ErrorBase_1.ErrorBase {
    constructor(message = 'Unauthorized', details, fix) {
        super(message, 401, details, fix);
    }
}
exports.UnauthorizedError = UnauthorizedError;
/**
 * ForbiddenError (403)
 * - Used when the user is authenticated but does not have the required permissions.
 * - Example: A user with a "viewer" role trying to access an "admin-only" endpoint.
 */
class ForbiddenError extends ErrorBase_1.ErrorBase {
    constructor(message = 'Forbidden', details, fix) {
        super(message, 403, details, fix);
    }
}
exports.ForbiddenError = ForbiddenError;
/**
 * ConflictError (409)
 * - Used when the user is already present and the user is trying to register it again.
 */
class ConflictError extends ErrorBase_1.ErrorBase {
    constructor(message = 'Conflict', details, fix) {
        super(message, 409, details, fix);
    }
}
exports.ConflictError = ConflictError;
/**
 * InternalServerError (500)
 * - Used when an unexpected error occurs on the server.
 * - Example: A database failure, null reference error, or unhandled exception.
 */
class InternalServerError extends ErrorBase_1.ErrorBase {
    constructor(message = 'Internal Server Error', details, fix) {
        super(message, 500, details, fix);
    }
}
exports.InternalServerError = InternalServerError;
