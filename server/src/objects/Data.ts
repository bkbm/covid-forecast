export class DataPoint{
    index: number;
    daily: number | undefined;
    date: string;
    predicted: number| undefined;

    constructor(index:number,date:string,daily:number|undefined =undefined){
        this.index = index;
        this.daily = daily;
        this.date = date;
    }

    addPrediction(value: number){
        this.predicted = value;
    }
    get(key: string){
        switch (key){
            case 'index':
                return this.index;
            case 'daily':
                return this.daily;
            case 'date':
                return this.date;
            case 'predicted':
                return this.predicted;
        }
    }

    set(key: string, value: unknown){
        switch (key){
            case 'index':
                if (typeof value === 'number')  this.index = Number(value);
                break;
            case 'daily':
                if (typeof value === 'number')  this.daily = Number(value);
                break;
            case 'date':
                if (typeof value === 'string') this.date = String(value);
        }
    }
}

export class Data {
    data: DataPoint[]

    constructor(){
        this.data = [];
    }

    getItem(index: number, col: string){
        return this.data[index].get(col);
    }
    
    getRow(value: number | string, _cols = 'index'){
        return this.data.filter(item => item.get(_cols) == value )
    }
    getColumn(col:string){
        const out: unknown[] = []
        this.data.forEach(element => {
            out.push(element.get(col))
        })
        return out;
    }
    setItem(index: number, col: string, value: unknown){
        this.data[index].set(col,value)
    }
    setRow(index:number, value: DataPoint){
        this.data[index] = value;
    }
    setColumn(values: unknown[], col: string){
        for (let index = 0; index < this.data.length; index++) {
            this.data[index].set(col, values[index]);           
        }
    }
    addDataPoint(value: DataPoint){
        this.data.push(value);
    }
    lastDataPoint(){
        return this.data.slice(-1)
    }
    copyOf(){
        const out = new Data();
        out.data = [...this.data];
        return out;
    }

}

export interface series{
    date: string[];
    y: number[];
}
export interface laggedSeries {
    date: string[];
    y: number[];
    lagged: number[];
}

const getLaggedSeries= (series: series, lag: number)=>{
    const dates = []
    const y = []
    const lagged = []
    for (let index = lag; index < series.y.length; index++) {
        dates.push(series.date[index-lag]);
        y.push(series.y[index]);
        lagged.push(series.y[index-lag])
    }
    return {date:dates,y:y,lagged:lagged} as laggedSeries
}

export interface combinedData {
    [index: number] : {
        date: string,
        cases: number | undefined,
        predictedCases: number | undefined,
        deaths: number | undefined,
        predictedDeaths: number | undefined
        }
}