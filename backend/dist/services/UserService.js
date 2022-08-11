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
exports.findByNameService = exports.deleteUserService = exports.updateUserService = exports.findUserService = exports.createUserService = exports.getUserService = void 0;
const express_validator_1 = require("express-validator");
const bcrypt_1 = __importDefault(require("bcrypt"));
const moment_1 = __importDefault(require("moment"));
const utils_1 = require("../utils");
const User_1 = __importDefault(require("../models/User"));
const const_1 = require("../const/const");
const getUserService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = req.query.page || 0;
        const usersPerPage = req.query.upp || 5;
        const userType = req.headers['userType'];
        const userId = req.headers['userId'];
        let condition = { deleted_at: null };
        if (userType === const_1.constData.userType) {
            condition.created_user_id = userId;
        }
        const users = yield User_1.default.find(condition).skip(page * usersPerPage).limit(usersPerPage);
        const result = [];
        for (let i = 0; i < users.length; i++) {
            const index = users.findIndex((dist) => users[i]._id.equals(dist._id));
            let username = "";
            index !== -1 ? username = users[index].name : "";
            let obj = Object.assign(Object.assign({}, users[i]._doc), { created_username: username });
            result.push(obj);
        }
        res.json({
            data: result,
            status: 1,
            total: result.length,
            links: {
                self: req.originalUrl,
            }
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getUserService = getUserService;
const createUserService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req.body);
        if (!errors.isEmpty()) {
            const error = new Error("Validation failed!");
            error.data = errors.array();
            error.statusCode = 422;
            throw error;
        }
        let profile = req.body.profile;
        if (req.file) {
            profile = req.file.path.replace("\\", "/");
        }
        const userTdo = {
            name: req.body.name,
            email: req.body.email,
            password: yield bcrypt_1.default.hash(req.body.password, 12),
            type: req.body.type,
            phone: req.body.phone,
            dob: req.body.dob,
            address: req.body.address,
            profile: profile,
            created_user_id: req.body.created_user_id,
        };
        const post = new User_1.default(userTdo);
        const result = yield post.save();
        res
            .status(201)
            .json({ message: "Created User Successfully!", data: result, status: 1 });
    }
    catch (err) {
        next(err);
    }
});
exports.createUserService = createUserService;
const findUserService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.params.id);
        if (!user) {
            const error = Error("Not Found!");
            error.statusCode = 404;
            throw error;
        }
        res.json({ data: user, status: 1 });
    }
    catch (err) {
        next(err);
    }
});
exports.findUserService = findUserService;
const updateUserService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req.body);
        if (!errors.isEmpty()) {
            const error = new Error("Validation failed!");
            error.data = errors.array();
            error.statusCode = 422;
            throw error;
        }
        const user = yield User_1.default.findById(req.params.id);
        if (!user) {
            const error = new Error("Not Found!");
            error.statusCode = 404;
            throw error;
        }
        let profile = req.body.profile;
        if (req.file) {
            profile = req.file.path.replace("\\", "/");
            if (user.profile && user.profile != profile) {
                (0, utils_1.deleteFile)(user.profile);
            }
            if (profile) {
                user.profile = profile;
            }
        }
        user.name = req.body.name;
        user.email = req.body.email;
        user.type = req.body.type;
        user.phone = req.body.phone;
        user.dob = req.body.dob;
        user.address = req.body.address;
        user.created_user_id = req.body.created_user_id;
        user.updated_user_id = req.body.updated_user_id;
        const result = yield user.save();
        res.json({ message: "Updated User Successfully!", data: result, status: 1 });
    }
    catch (err) {
        next(err);
    }
});
exports.updateUserService = updateUserService;
const deleteUserService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.params.id);
        if (!user) {
            const error = new Error("Not Found!");
            error.statusCode = 404;
            throw error;
        }
        user.deleted_at = new Date();
        const result = yield user.save();
        res.json({ message: "Delete User Successfully!", data: result, status: 1 });
    }
    catch (err) {
        next(err);
    }
});
exports.deleteUserService = deleteUserService;
const findByNameService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
    try {
        const page = req.query.page || 0;
        const usersPerPage = req.query.upp || 5;
        const userType = req.headers['userType'];
        const userId = req.headers['userId'];
        let condition = { deleted_at: null };
        if (userType === "User") {
            condition.created_user_id = userId;
        }
        let fromDate = ((_a = req.body) === null || _a === void 0 ? void 0 : _a.fromDate) ? new Date(req.body.fromDate) : null;
        let toDate = ((_b = req.body) === null || _b === void 0 ? void 0 : _b.toDate) ? new Date(req.body.toDate) : null;
        ((_c = req.body) === null || _c === void 0 ? void 0 : _c.username) ? condition.name = { '$regex': req.body.username, '$options': 'i' } : '';
        ((_d = req.body) === null || _d === void 0 ? void 0 : _d.email) ? condition.email = { '$regex': req.body.email, '$options': 'i' } : '';
        ((_e = req.body) === null || _e === void 0 ? void 0 : _e.fromDate) && ((_f = req.body) === null || _f === void 0 ? void 0 : _f.toDate) ? condition.createdAt = { $gte: fromDate, $lte: toDate } : '';
        ((_g = req.body) === null || _g === void 0 ? void 0 : _g.fromDate) && !((_h = req.body) === null || _h === void 0 ? void 0 : _h.toDate) ? condition.createdAt = { $gte: fromDate, $lte: new Date() } : '';
        ((_j = req.body) === null || _j === void 0 ? void 0 : _j.toDate) && !((_k = req.body) === null || _k === void 0 ? void 0 : _k.fromDate) ? condition.createdAt = { $lte: toDate } : '';
        ((_l = req.body) === null || _l === void 0 ? void 0 : _l.fromDate) && ((_m = req.body) === null || _m === void 0 ? void 0 : _m.toDate) && ((_o = req.body) === null || _o === void 0 ? void 0 : _o.fromDate) === ((_p = req.body) === null || _p === void 0 ? void 0 : _p.toDate) ?
            condition.createdAt = { $gte: (0, moment_1.default)(fromDate), $lte: (0, moment_1.default)(toDate).add(1, 'days') } : '';
        const users = yield User_1.default.find(condition).skip(page * usersPerPage).limit(usersPerPage);
        ;
        const result = [];
        for (let i = 0; i < users.length; i++) {
            const index = users.findIndex((dist) => users[i]._id.equals(dist._id));
            let username = "";
            index !== -1 ? username = users[index].name : "";
            let obj = Object.assign(Object.assign({}, users[i]._doc), { created_username: username });
            result.push(obj);
        }
        res.json({ data: result, status: 1 });
    }
    catch (err) {
        next(err);
    }
});
exports.findByNameService = findByNameService;
