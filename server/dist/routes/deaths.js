"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const deaths_1 = require("../controllers/deaths");
router.get('/', deaths_1.getDeaths);
exports.default = router;
//# sourceMappingURL=deaths.js.map