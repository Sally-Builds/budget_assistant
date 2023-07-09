"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const budget_controller_1 = __importDefault(require("../controllers/budget.controller"));
const validation_middleware_1 = __importDefault(require("@/middleware/validation.middleware"));
const budget_validation_1 = __importDefault(require("../validations/budget.validation"));
class BudgetRouter {
    constructor(controller) {
        this._router = (0, express_1.Router)();
        this.getRouter = () => {
            return this._router;
        };
        this._controller = controller;
        this._router
            .route('/')
            .post((0, validation_middleware_1.default)(budget_validation_1.default.create), this._controller.createBudget)
            .get(this._controller.getAllBudget);
        this._router.route('/:id').get(this._controller.getBudget);
    }
}
exports.default = new BudgetRouter(budget_controller_1.default).getRouter;
