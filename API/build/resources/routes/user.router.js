"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const validation_middleware_1 = __importDefault(require("@/middleware/validation.middleware"));
const user_validation_1 = __importDefault(require("../validations/user.validation"));
class UserRouter {
    constructor(controller) {
        this.router = (0, express_1.Router)();
        this.getRouter = () => {
            return this.router;
        };
        this._controller = controller;
        this.router.post('/register', (0, validation_middleware_1.default)(user_validation_1.default.create), this._controller.register);
        this.router.post('/login', (0, validation_middleware_1.default)(user_validation_1.default.login), this._controller.login);
    }
}
exports.default = new UserRouter(user_controller_1.default).getRouter;
