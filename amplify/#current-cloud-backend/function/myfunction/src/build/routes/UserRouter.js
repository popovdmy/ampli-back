"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../controllers/UserController");
exports.UserRouter = express_1.default.Router();
exports.UserRouter.get('/:id', UserController_1.getUser);
exports.UserRouter.put('/:id', UserController_1.updateUser);
exports.UserRouter.delete('/:id', UserController_1.deleteUser);
exports.UserRouter.get('/', UserController_1.getUsers);
exports.UserRouter.post('/', UserController_1.createUser);
//# sourceMappingURL=UserRouter.js.map