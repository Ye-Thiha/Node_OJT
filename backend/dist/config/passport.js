"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = __importDefault(require("passport-jwt"));
const User_1 = __importDefault(require("../models/User"));
const JWTStrategy = passport_jwt_1.default.Strategy;
const ExtractJWT = passport_jwt_1.default.ExtractJwt;
passport_1.default.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'abcd'
}, function (jwtPayload, cb) {
    return User_1.default.findOne({ id: jwtPayload.id }, function (err, user) {
        if (err) {
            return cb(err, false);
        }
        if (user) {
            return cb(null, user);
        }
        else {
            return cb(null, false);
        }
    });
}));
