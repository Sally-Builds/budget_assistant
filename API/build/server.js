"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("module-alias/register");
const validateEnv_1 = __importDefault(require("@/utils/validateEnv"));
const app_1 = __importDefault(require("./app"));
const user_router_1 = __importDefault(require("./resources/routes/user.router"));
// controller imports below
(0, validateEnv_1.default)();
const app = new app_1.default([
    {
        path: 'users',
        router: (0, user_router_1.default)(),
    },
], Number(process.env.PORT));
app.listen();