"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Em seu arquivo de rotas (por exemplo, routes.js)
const express_1 = __importDefault(require("express"));
const weather_1 = require("../controllers/weather");
const router = express_1.default.Router();
router.get('/', weather_1.getWeatherCurrent);
exports.default = router;
