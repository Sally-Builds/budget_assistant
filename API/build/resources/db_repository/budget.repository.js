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
const budget_model_1 = __importDefault(require("../models/budget.model"));
const httpExceptions_1 = __importDefault(require("@/utils/exceptions/httpExceptions"));
class BudgetRepository {
    /**
     *
     * @param data budget payload
     * @returns newly created budget
     */
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const budget = yield budget_model_1.default.create(data);
                return budget;
            }
            catch (error) {
                throw new httpExceptions_1.default(error, 500);
            }
        });
    }
    /**
     *
     * @param query query / filter for budget
     * @returns queried/filtered budget[]
     */
    static findAll(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const budget = yield budget_model_1.default.find(query);
                return budget;
            }
            catch (error) {
                throw new httpExceptions_1.default(error, 500);
            }
        });
    }
    /**
     *
     * @param id id of budget to get
     * @returns requested budget
     */
    static find(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const budget = yield budget_model_1.default.findById(id);
                return budget;
            }
            catch (error) {
                throw new httpExceptions_1.default(error, 500);
            }
        });
    }
    /**
     *
     * @param id  id of budget to update
     * @param data update to commit to db
     * @returns newly updated budget data
     */
    static update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const budget = yield budget_model_1.default.findByIdAndUpdate(id, data, { new: true, runValidators: true });
                return budget;
            }
            catch (error) {
                throw new httpExceptions_1.default(error, 500);
            }
        });
    }
    /**
     *
     * @param id id of budget to delete
     */
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield budget_model_1.default.findByIdAndDelete(id);
            }
            catch (error) {
                throw new httpExceptions_1.default(error, 500);
            }
        });
    }
}
exports.default = BudgetRepository;
