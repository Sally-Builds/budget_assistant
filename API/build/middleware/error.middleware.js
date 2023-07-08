"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorMiddleware(err, req, res, next) {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Something went wrong';
    console.log(err.stack);
    res.status(statusCode).json({
        statusCode,
        message,
    });
}
exports.default = errorMiddleware;
