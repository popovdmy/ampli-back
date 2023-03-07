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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUser = exports.getUsers = void 0;
const core_1 = require("@mikro-orm/core");
const app_1 = require("../app");
const UserEntity_1 = require("../entities/UserEntity");
const getUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield app_1.DI.userRepository.findAll();
        return res.status(200).json(user);
    }
    catch (e) {
        return res.status(400).json({ message: e.message });
    }
});
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield app_1.DI.userRepository.findOne(req.params.id, {});
        if (!user) {
            return res.status(404).json({ message: 'User does not exist' });
        }
        return res.status(200).json(user);
    }
    catch (e) {
        return res.status(400).json({ message: e.message });
    }
});
exports.getUser = getUser;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.username || !req.body.email || !req.body.password) {
        return res.status(400).json({ message: 'Missing essential parameters' });
    }
    try {
        const user = app_1.DI.em.create(UserEntity_1.UserEntity, req.body);
        yield app_1.DI.userRepository.persist(user).flush();
        return res.status(200).json(user);
    }
    catch (e) {
        return res.status(400).json({ message: e.message });
    }
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.title || !req.body.text) {
        return res.status(400).json({ message: 'Missing essential parameters' });
    }
    try {
        const user = yield app_1.DI.userRepository.findOne(req.params.id, {});
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        (0, core_1.wrap)(user).assign({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            email: req.body.email,
        });
        yield app_1.DI.userRepository.persist(user).flush();
        return res.status(200).json(user);
    }
    catch (e) {
        return res.status(400).json({ message: e.message });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield app_1.DI.userRepository.findOne(req.params.id, {});
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        yield app_1.DI.userRepository.removeAndFlush(user);
        return res.status(200).json(user);
    }
    catch (e) {
        return res.status(400).json({ message: e.message });
    }
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=UserController.js.map