export class ErrorBase extends Error {
    code: number = 500;
    details?: string[]
    fix?: string;

    constructor(message: string, code: number, details?: string[], fix?: string){
        super(message || "Internal Server Error");
        this.code = code;
        this.details = details;
        this.fix = fix;
    }
}