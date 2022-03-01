import { DataPoint } from "./Data";
import { LinearRegression, SegmentedLinearRegression } from "./regressionModels";

export class DataHandler {

    data: DataPoint[]; 
    model: LinearRegression | SegmentedLinearRegression;

    constructor(model: LinearRegression | SegmentedLinearRegression){
        this.data = [];
        this.model = model;
    }

    addDataPoint(daily: number, date: string){
        if (this.data.length<1){
            this.data.push(new DataPoint(0,date,daily));
        } else{
            this.data.push(new DataPoint(this.data.at(-1)!.index+1,date,daily))
        }
    }

    setModel(model: LinearRegression | SegmentedLinearRegression){
        this.model = model;
    }
    
    train() {
        const x: number[] = [];
        const y: number[] = [];
        for (let index = 0; index < this.data.length; index++) {
            const element = this.data[index];
            x.push(element.index);
            y.push(element.daily!);
        }
        this.model.train(x,y);
    }
     
    cloneData(){
        return this.data.map((x)=>x)
    }

    predict(forecast:number) {
        const inp: DataPoint[] = this.cloneData();
        const x: number[] = [];
        inp.forEach(element => x.push(element.index) );
        const i = inp.at(-1)!;

        if(forecast > 0){
            for (let index = 1; index < forecast+1; index++) {
                const last: Date = new Date(i.date);
                last.setDate(last.getDate() + index);

                const date = `${last.getFullYear()}-${('0'+(last.getMonth()+1)).slice(-2)}-${('0'+last.getDate()).slice(-2)}`;
                const xi = (i.index+index);
                x.push(xi)
                inp.push(new DataPoint(xi,date,undefined));
            }
        }
        const predicted: number[] = this.model.predict(x);
/*         console.log(predicted); */
        for (let index = 0; index < predicted.length; index++) {
            inp[index].addPrediction(predicted[index])
        }
        return inp;
    }

}