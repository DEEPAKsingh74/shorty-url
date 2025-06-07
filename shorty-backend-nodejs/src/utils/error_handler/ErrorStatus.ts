import { ErrorBase } from "./ErrorBase";

/**
 * NotFoundError (404)
 * - Used when a requested resource (e.g., a user, product, or page) is not found in the database.
 * - Example: Fetching a user by ID that does not exist.
 */
class NotFoundError extends ErrorBase {
    constructor(message: string = 'Not Found', details?: string[], fix?: string) {
        super(message, 404, details, fix);
    }
}

/**
 * BadRequestError (400)
 * - Used when the client sends an invalid request (e.g., missing required fields, invalid data format).
 * - Example: A form submission with missing required fields.
 */
class BadRequestError extends ErrorBase {
    constructor(message: string = 'Bad Request', details?: string[], fix?: string) {
        super(message, 400, details, fix);
    }
}

/**
 * UnauthorizedError (401)
 * - Used when authentication is required but not provided or invalid.
 * - Example: Accessing a protected route without a valid authentication token.
 */
class UnauthorizedError extends ErrorBase {
    constructor(message: string = 'Unauthorized', details?: string[], fix?: string) {
        super(message, 401, details, fix);
    }
}

/**
 * ForbiddenError (403)
 * - Used when the user is authenticated but does not have the required permissions.
 * - Example: A user with a "viewer" role trying to access an "admin-only" endpoint.
 */
class ForbiddenError extends ErrorBase {
    constructor(message: string = 'Forbidden', details?: string[], fix?: string) {
        super(message, 403, details, fix);
    }
}

/**
 * ConflictError (409)
 * - Used when the user is already present and the user is trying to register it again.
 */
class ConflictError extends ErrorBase {
    constructor(message: string = 'Conflict', details?: string[], fix?: string) {
        super(message, 409, details, fix);
    }
}

/**
 * InternalServerError (500)
 * - Used when an unexpected error occurs on the server.
 * - Example: A database failure, null reference error, or unhandled exception.
 */
class InternalServerError extends ErrorBase {
    constructor(message: string = 'Internal Server Error', details?: string[], fix?: string) {
        super(message, 500, details, fix);
    }
}

export {
    NotFoundError,
    BadRequestError,
    UnauthorizedError,
    ForbiddenError,
    InternalServerError,
    ConflictError
};