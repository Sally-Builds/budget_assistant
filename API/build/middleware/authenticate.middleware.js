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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const token_1 = require("@/utils/token");
const user_repository_1 = __importDefault(require("@/resources/db_repository/user.repository"));
const httpExceptions_1 = __importDefault(require("@/utils/exceptions/httpExceptions"));
function authenticate(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const bearer = req.headers.authorization;
        if (!bearer || !bearer.startsWith('Bearer')) {
            return next(new httpExceptions_1.default('Unauthorized access', 401));
        }
        const accessToken = bearer.split('Bearer ')[1].trim();
        try {
            const payload = yield (0, token_1.verifyToken)(accessToken);
            if (payload instanceof jsonwebtoken_1.default.JsonWebTokenError) {
                return next(new httpExceptions_1.default('Unauthorized access', 401));
            }
            const user = yield user_repository_1.default.getById(payload.id);
            if (!user) {
                return next(new httpExceptions_1.default('Unauthorized access', 401));
            }
            req.user = user;
            next();
        }
        catch (error) {
            next(new httpExceptions_1.default('Unauthorized access', 401));
        }
    });
}
exports.default = authenticate;
