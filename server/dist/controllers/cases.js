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
exports.getCases = void 0;
const types_1 = require("../types");
const axios_1 = __importDefault(require("axios"));
const getCases = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uri = ('https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=nation;areaName=england&structure={"date":"date","daily":"newCasesByPublishDate"}');
    try {
        const resp = (yield axios_1.default.get(uri)).data;
        const len = Object.keys(resp.data).length;
        const data = new types_1.Data(new types_1.SegmentedLinearRegression(25));
        for (let index = 0; index < len; index++) {
            const element = resp.data[len - 1 - index];
            data.addDataPoint(element.daily, element.date);
        }
        data.train();
        const weeks = 2;
        res.status(201).json(data.predict(weeks * 7));
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ success: false, error: error });
    }
});
exports.getCases = getCases;
//# sourceMappingURL=cases.js.map