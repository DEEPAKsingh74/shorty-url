export type ErrorResponse = {
    success: boolean,
    error: {
        message: string,
        detail: string,
        status: number,
        fix: string
    }
}