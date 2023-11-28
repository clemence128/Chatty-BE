"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const validate_1 = __importDefault(require("../middlewares/validate"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const auth_validation_1 = require("../validations/auth.validation");
const router = (0, express_1.Router)();
router.post('/signup', (0, validate_1.default)(auth_validation_1.signUpValidator), (0, catchAsync_1.default)(auth_controller_1.default.signup));
router.post('/signin', (0, validate_1.default)(auth_validation_1.signIpValidator), (0, catchAsync_1.default)(auth_controller_1.default.signin));
exports.default = router;
