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
const income_expense_model_1 = __importDefault(require("../models/income_expense.model"));
const httpExceptions_1 = __importDefault(require("@/utils/exceptions/httpExceptions"));
class expense_incomeRepository {
    /**
     *
     * @param data expense_income payload
     * @returns newly created expense_income
     */
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const expense_income = yield income_expense_model_1.default.create(data);
                return expense_income;
            }
            catch (error) {
                throw new httpExceptions_1.default(error, 500);
            }
        });
    }
    /**
     *
     * @param query query / filter for expense_income
     * @returns queried/filtered expense_income[]
     */
    static findAll(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const expense_income = yield income_expense_model_1.default.find(query);
                return expense_income;
            }
            catch (error) {
                throw new httpExceptions_1.default(error, 500);
            }
        });
    }
    /**
     *
     * @param id id of expense_income to get
     * @returns requested expense_income
     */
    static find(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const expense_income = yield income_expense_model_1.default.findById(id);
                return expense_income;
            }
            catch (error) {
                throw new httpExceptions_1.default(error, 500);
            }
        });
    }
    /**
     *
     * @param id  id of expense_income to update
     * @param data update to commit to db
     * @returns newly updated expense_income data
     */
    static update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const expense_income = yield income_expense_model_1.default.findByIdAndUpdate(id, data, { new: true, runValidators: true });
                return expense_income;
            }
            catch (error) {
                throw new httpExceptions_1.default(error, 500);
            }
        });
    }
    /**
     *
     * @param id id of expense_income to delete
     */
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield income_expense_model_1.default.findByIdAndDelete(id);
            }
            catch (error) {
                throw new httpExceptions_1.default(error, 500);
            }
        });
    }
}
exports.default = expense_incomeRepository;
