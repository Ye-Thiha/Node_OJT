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
exports.findByIdService = exports.deleteCinemaService = exports.updateCinemaService = exports.findCinemaService = exports.createCinemaService = exports.getCinemaService = void 0;
const cinema_model_1 = __importDefault(require("../models/cinema.model"));
const express_validator_1 = require("express-validator");
/**
 * get post service.
 * @param _req
 * @param res
 * @param next
 */
const getCinemaService = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = _req.query.page || 0;
        const cinemasPerPage = _req.query.pageSize || 5;
        let condition = { deleted_at: null };
        const cinemas = yield cinema_model_1.default.find(condition).skip(page * cinemasPerPage).limit(cinemasPerPage);
        res.json({ data: cinemas, status: 1 });
    }
    catch (err) {
        next(err);
    }
});
exports.getCinemaService = getCinemaService;
/**
 * create post service
 * @param req
 * @param res
 * @param next
 */
const createCinemaService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req.body);
        if (!errors.isEmpty()) {
            const error = new Error("Validation failed!");
            error.data = errors.array();
            error.statusCode = 401;
            throw error;
        }
        const cinemaList = req.body;
        const body = {
            name: req.body.name
        };
        const cinema = new cinema_model_1.default(cinemaList);
        const result = yield cinema.save();
        res
            .status(201)
            .json({ message: "Created Successfully!", data: result, status: 1 });
    }
    catch (err) {
        next(err);
    }
});
exports.createCinemaService = createCinemaService;
const findCinemaService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cinema = yield cinema_model_1.default.findById(req.params.id);
        if (!cinema) {
            const error = Error("Not Found!");
            error.statusCode = 401;
            throw error;
        }
        res.json({ data: cinema, status: 1 });
    }
    catch (err) {
        next(err);
    }
});
exports.findCinemaService = findCinemaService;
const updateCinemaService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req.body);
        if (!errors.isEmpty()) {
            const error = new Error("Validation failed!");
            error.data = errors.array();
            error.statusCode = 401;
            throw error;
        }
        const cinema = yield cinema_model_1.default.findById(req.params.id);
        if (!cinema) {
            const error = new Error("Not Found!");
            error.statusCode = 404;
            throw error;
        }
        cinema.name = req.body.name;
        cinema.date = req.body.date;
        cinema.time = req.body.time;
        cinema.created_user_id = req.body.created_user_id;
        cinema.updated_user_id = req.body.updated_user_id;
        const result = yield cinema.save();
        res.json({ message: "Updated Successfully!", data: result, status: 1 });
    }
    catch (err) {
        next(err);
    }
});
exports.updateCinemaService = updateCinemaService;
const deleteCinemaService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cinema = yield cinema_model_1.default.findByIdAndRemove(req.params.id);
        if (!cinema) {
            const error = new Error("Not Found!");
            error.statusCode = 404;
            throw error;
        }
        cinema.deleted_at = new Date();
        yield cinema.save();
        res.sendStatus(204);
    }
    catch (err) {
        next(err);
    }
});
exports.deleteCinemaService = deleteCinemaService;
const findByIdService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = req.query.page || 0;
        const cinemasPerPage = req.query.ppp || 5;
        const userType = req.headers['userType'];
        const userId = req.headers['userId'];
        let condition = { userId: { '$regex': req.params.userId, '$options': 'i' }, deleted_at: null };
        if (userType === "User") {
            condition.created_user_id = userId;
        }
        const cinemas = yield cinema_model_1.default.find(condition).skip(page * cinemasPerPage).limit(cinemasPerPage);
        res.json({ data: cinemas, status: 1 });
    }
    catch (err) {
        next(err);
    }
});
exports.findByIdService = findByIdService;
