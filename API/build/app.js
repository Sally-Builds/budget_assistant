"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = require("mongoose");
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const error_middleware_1 = __importDefault(require("@/middleware/error.middleware"));
class App {
    constructor(controllers, port) {
        this.port = port;
        this.app = (0, express_1.default)();
        this.initializeMiddleware();
        this.initializeControllers(controllers);
        this.initializeDB();
        this.intializeErrorHandler();
    }
    initializeMiddleware() {
        this.app.use((0, cors_1.default)());
        this.app.use((0, compression_1.default)());
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, helmet_1.default)());
        this.app.use((0, cookie_parser_1.default)());
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
    }
    initializeControllers(controllers) {
        controllers.map((controller) => {
            this.app.use(`/api/${controller.path}`, controller.router);
        });
    }
    intializeErrorHandler() {
        this.app.use(error_middleware_1.default);
    }
    initializeDB() {
        const url = `${process.env.DATABASE_URL}`;
        (0, mongoose_1.connect)(url, {}).then(() => {
            console.log('Database Connected Successully');
        });
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Application running on port ${this.port}`);
        });
    }
}
exports.default = App;
