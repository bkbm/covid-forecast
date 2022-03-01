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
exports.getData = void 0;
const axios_1 = __importDefault(require("axios"));
const Data_1 = require("../objects/Data");
const DataHandler_1 = require("../objects/DataHandler");
const regressionModels_1 = require("../objects/regressionModels");
const getData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uri = ('https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=nation;areaName=england&structure={"date":"date","cases":"newCasesByPublishDate","deaths":"newDeaths28DaysByPublishDate"}');
    try {
        const resp = (yield axios_1.default.get(uri)).data;
        const len = Object.keys(resp.data).length;
        const cases = new DataHandler_1.DataHandler(new regressionModels_1.SegmentedLinearRegression(50));
        const deaths = new DataHandler_1.DataHandler(new regressionModels_1.SegmentedLinearRegression(50));
        for (let index = 0; index < len; index++) {
            const element = resp.data[len - 1 - index];
            cases.addDataPoint(element.cases, element.date);
            deaths.addDataPoint(element.deaths, element.date);
        }
        cases.train();
        deaths.train();
        const weeks = 6;
        const predictedCases = cases.predict(weeks * 7);
        const predictedDeaths = deaths.predict(weeks * 7);
        const combinedData = combineData(predictedCases, predictedDeaths);
        res.status(201).json(combinedData);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ success: false, error: error });
    }
});
exports.getData = getData;
function combineData(cases, deaths) {
    const out = {};
    cases.forEach(element => {
        let death = new Data_1.DataPoint(element.index, element.date);
        deaths.forEach(point => {
            if (point.date == element.date)
                death = point;
        });
        return out[element.index] = { date: element.date, cases: element.daily, predictedCases: element.predicted, deaths: death.daily, predictedDeaths: death.predicted };
    });
    return out;
}
//# sourceMappingURL=data.js.map