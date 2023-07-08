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
const user_model_1 = __importDefault(require("../models/user.model"));
const httpExceptions_1 = __importDefault(require("@/utils/exceptions/httpExceptions"));
class UserRepository {
    /**
     * @
     * @param data - user payload
     * @returns - newly created user
     */
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_model_1.default.create(data);
                return user;
            }
            catch (error) {
                throw new httpExceptions_1.default(error, 500);
            }
        });
    }
    /**
     *
     * @param reg_no - student registration no(unique)
     * @returns user with that reg_no
     */
    static getByReg_no(reg_no) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield user_model_1.default.findOne({ reg_no });
            }
            catch (error) {
                new httpExceptions_1.default(error, 500);
            }
        });
    }
    /**
     *
     * @param id user id
     * @returns user with the id
     */
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield user_model_1.default.findOne({ id });
            }
            catch (error) {
                new httpExceptions_1.default(error, 500);
            }
        });
    }
    /**
     * @param query - filter data using some fields
     * @returns all users
     */
    static getAll(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield user_model_1.default.find(query);
            }
            catch (error) {
                new httpExceptions_1.default(error, 500);
            }
        });
    }
    /**
     *
     * @param id - user id to update
     * @param data - data to update
     * @returns newly updated user data
     */
    static update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield user_model_1.default.findOneAndUpdate({ id }, data, { new: true, runValidators: true });
            }
            catch (error) {
                new httpExceptions_1.default(error, 500);
            }
        });
    }
}
exports.default = UserRepository;
