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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_repository_1 = __importDefault(require("../db_repository/user.repository"));
const httpExceptions_1 = __importDefault(require("@/utils/exceptions/httpExceptions"));
const token_1 = require("@/utils/token");
class UserService {
    constructor() {
        this.register = (name, reg_no, department, gender, password) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (yield user_repository_1.default.getByReg_no(reg_no)) {
                    throw new httpExceptions_1.default('Registration number already exist', 400);
                }
                const user = {
                    name,
                    reg_no,
                    department,
                    gender,
                    password: yield this.encryptPassword(password),
                };
                const newUser = yield user_repository_1.default.create(user);
                const token = yield (0, token_1.createToken)(newUser);
                newUser.password = undefined;
                return { user: newUser, token };
            }
            catch (error) {
                throw new httpExceptions_1.default(error.message, error.statusCode);
            }
        });
        this.login = (reg_no, password) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_repository_1.default.getByReg_no(reg_no);
                if (!user)
                    throw new httpExceptions_1.default('Email or Password invalid', 404);
                if (!(yield this.verifyPassword(password, user.password)))
                    throw new httpExceptions_1.default('Email or Password invalid', 404);
                const token = yield (0, token_1.createToken)(user);
                user.password = undefined;
                return { user, token };
            }
            catch (error) {
                throw new httpExceptions_1.default(error.message, error.statusCode);
            }
        });
    }
    encryptPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcryptjs_1.default.hash(password, 12);
        });
    }
    verifyPassword(passwordString, hash) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcryptjs_1.default.compare(passwordString, hash);
        });
    }
}
exports.default = UserService;
