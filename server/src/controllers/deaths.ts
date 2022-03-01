/* import regression from '../models/regression' */
import { Data, LinearRegression, SegmentedLinearRegression } from "../types";
import { Request, Response } from "express";
import axios from 'axios';

export const getDeaths = async(req: Request, res: Response) => {
    const uri = ('https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=nation;areaName=england&structure={"date":"date","daily":"newDeaths28DaysByPublishDate"}');
    try {
        const resp =  (await axios.get(uri)).data;
        const len: number  = Object.keys(resp.data).length;
        const data: Data = new Data(new SegmentedLinearRegression(25))
        for (let index = 0; index < len; index++) {
            const element = resp.data[len -1-index];
/*             console.log(element.newCases, element.date); */
            data.addDataPoint(element.daily,element.date)
        }
        data.train();
        const weeks = 2;
        res.status(201).json(data.predict(weeks*7));
    }catch(error){
        console.log(error);
        res.status(400).json({success: false, error: error});
    }
}
