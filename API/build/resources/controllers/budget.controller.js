"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BudgetController = void 0;
const budget_service_1 = __importDefault(require("../services/budget.service"));
const httpExceptions_1 = __importDefault(require("@/utils/exceptions/httpExceptions"));
class BudgetController {
    constructor(service) {
        this.createBudget = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, amount, year, semester, type, category } = req.body;
                const budget = yield this._service.create(name, amount, year, semester, type, category);
                res.status(200).json(budget);
            }
            catch (error) {
                next(new httpExceptions_1.default(error.message, error.statusCode));
            }
        });
        this.getBudget = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const budget = yield this._service.get(req.params.id);
                res.status(200).json(budget);
            }
            catch (error) {
                next(new httpExceptions_1.default(error.message, error.statusCode));
            }
        });
        this.getAllBudget = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const budgets = yield this._service.getAll(req.query);
                res.status(200).json({ result: budgets.length, budgets });
            }
            catch (error) {
                next(new httpExceptions_1.default(error.message, error.statusCode));
            }
        });
        this._service = service;
    }
}
exports.BudgetController = BudgetController;
exports.default = new BudgetController(new budget_service_1.default());
