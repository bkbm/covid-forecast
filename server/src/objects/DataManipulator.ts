import { Data, DataPoint, series } from "./Data"


class DataManipulator{
    data: Data

    constructor(){
        this.data = new Data()
    }

    toSeries(): series{
        const daily: number[] = this.data.getColumn('daily') as number[]
        const date: string[] = this.data.getColumn('date') as string[]
        return {date: date,y: daily} as series
    }

    addData(data: DataPoint[]){
        data.forEach(element => this.data.addDataPoint(element))
    }
    createNextDate(current:string, days: number){
        const date = new Date(current)
        date.setDate(date.getDate()+days)
        return date.toISOString().split('T')[0];
    }
    createNextWeeks(weeks: number){
        const out = this.data.copyOf()
        const today = this.data.lastDataPoint();
        const lastIndex = today[0].index;
        const lastDate = today[0].date;
        for (let index = 1; index <= weeks; index++) {
            out.addDataPoint(new DataPoint(lastIndex+index,this.createNextDate(lastDate,index)));
        }
        return out;
    }
} 