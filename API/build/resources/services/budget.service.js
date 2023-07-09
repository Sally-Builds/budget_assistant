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
const randomstring_1 = __importDefault(require("randomstring"));
const budget_repository_1 = __importDefault(require("../db_repository/budget.repository"));
const httpExceptions_1 = __importDefault(require("@/utils/exceptions/httpExceptions"));
const semester_1 = __importDefault(require("../enums/semester"));
class BudgetService {
    constructor() {
        this.create = (name, amount, year, semester, type, category) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = {
                    name,
                    amount,
                    year,
                    session: `${year}/${year + 1}`,
                    semester,
                    type,
                    category,
                    code: this.generateCode(year, semester),
                };
                const budget = yield budget_repository_1.default.create(data);
                return budget;
            }
            catch (error) {
                throw new httpExceptions_1.default(error.message, error.statusCode);
            }
        });
        this.getAll = (query) => __awaiter(this, void 0, void 0, function* () {
            try {
                const budgets = yield budget_repository_1.default.findAll(query);
                return budgets;
            }
            catch (error) {
                throw new httpExceptions_1.default(error.message, error.statusCode);
            }
        });
        this.get = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const budget = yield budget_repository_1.default.find(id);
                if (!budget)
                    throw new httpExceptions_1.default('not found', 404);
                return budget;
            }
            catch (error) {
                throw new httpExceptions_1.default(error.message, error.statusCode);
            }
        });
        this.generateCode = (year, semester) => {
            const sem = semester == semester_1.default.first ? '01' : '02';
            const code = randomstring_1.default.generate(6);
            return `${year}-${sem}-${code}`;
        };
    }
}
exports.default = BudgetService;
