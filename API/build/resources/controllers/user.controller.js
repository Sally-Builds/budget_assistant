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
exports.UserController = void 0;
const user_service_1 = __importDefault(require("../services/user.service"));
const httpExceptions_1 = __importDefault(require("@/utils/exceptions/httpExceptions"));
class UserController {
    constructor(Service) {
        this.register = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, reg_no, department, gender, password } = req.body;
                const user = yield this._service.register(name, reg_no, department, gender, password);
                res.status(201).json({
                    user,
                });
            }
            catch (error) {
                next(new httpExceptions_1.default(error.message, error.statusCode));
            }
        });
        this.login = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { reg_no, password } = req.body;
                const user = yield this._service.login(reg_no, password);
                res.status(201).json({
                    user,
                });
            }
            catch (error) {
                next(new httpExceptions_1.default(error.message, error.statusCode));
            }
        });
        this._service = Service;
    }
}
exports.UserController = UserController;
exports.default = new UserController(new user_service_1.default());
