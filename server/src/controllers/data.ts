
import { Request, Response } from "express";
import axios from 'axios';
import { combinedData, DataPoint } from "../objects/Data";
import { DataHandler } from "../objects/DataHandler";
import { SegmentedLinearRegression } from "../objects/regressionModels";

export const getData = async(req: Request, res: Response) => {
    const uri = ('https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=nation;areaName=england&structure={"date":"date","cases":"newCasesByPublishDate","deaths":"newDeaths28DaysByPublishDate"}');
    try {
        const resp =  (await axios.get(uri)).data;
        const len: number  = Object.keys(resp.data).length;
        const cases: DataHandler = new DataHandler(new SegmentedLinearRegression(50))
        const deaths: DataHandler = new DataHandler(new SegmentedLinearRegression(50))
        for (let index = 0; index < len; index++) {
            const element = resp.data[len -1-index];
            cases.addDataPoint(element.cases,element.date);
            deaths.addDataPoint(element.deaths,element.date);
        }
        cases.train();
        deaths.train();
        const weeks = 6;
        const predictedCases = cases.predict(weeks*7)
        const predictedDeaths = deaths.predict(weeks*7)
        const combinedData: combinedData = combineData(predictedCases,predictedDeaths)
        res.status(201).json(combinedData);
    }catch(error){
        console.log(error);
        res.status(400).json({success: false, error: error});
    }
}

function combineData(cases: DataPoint[], deaths: DataPoint[]): combinedData{
    const out: combinedData = {};
    cases.forEach(element => {
        let death: DataPoint = new DataPoint(element.index,element.date)
        deaths.forEach(point => {
            if (point.date == element.date) death = point
        })

        return out[element.index] = {date: element.date, cases: element.daily, predictedCases: element.predicted, deaths: death.daily, predictedDeaths: death.predicted}
    })
    return out
}