export class ApiError extends Error {
    constructor(statusCode, message, data= null) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        this.data = data;
    }
}