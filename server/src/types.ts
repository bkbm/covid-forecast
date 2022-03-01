export class LinearRegression {
    m : number;
    b : number;

    constructor(){
        this.m = 0;
        this.b = 0;
    }
    train(x: number[],y: number[]){
        this.m = this.covariance(x,y)/this.variance(x);
        this.b = this.mean(y) - this.m*this.mean(x)
    }

    predict(x: number[]){
        const out: number[] = [];
        x.forEach(element => out.push((this.m*element)+this.b));
        return out;
    }

    mean(data: number[]){
        let sum = 0;
        data.forEach(element => {
            sum = sum + element;
        });
        return sum/data.length
    }
    variance(data: number[]){
        const mean = this.mean(data)
        let sum = 0;
        data.forEach(element => sum =  sum + ((element-mean)**2))
        return sum;
    }
    covariance(x:number[], y: number[]){
        const xmean = this.mean(x);
        const ymean = this.mean(y);
        let sum = 0;
        for (let index = 0; index < x.length; index++) {
            sum = sum + ((x[index]-xmean)*(y[index]-ymean))
        }
        return sum;
    }
/* 
m = covariance(x,y)/variance(x)
b = mean(y) - m*mean(x)
covariance = sum((x(i)-mean(x))*(y(i)-mean(y)))
variance = sum((x(i)-mean(x))**2)


 */
}

export class SegmentedLinearRegression {
    segments: number;
    models: LinearRegression[];
    splitIndex: number;

    constructor(segments: number){
        this.segments = segments;
        this.models = [];
        this.splitIndex = 0;
        for(let i = 0; i < segments; i++){
            this.models.push(new LinearRegression())

        }
    }

    train(x: number[],y: number[]){
        this.splitIndex = Math.floor(x.length/this.segments);
        for (let index = 0; index < this.segments-1; index++) {
            const xi = x.slice((index)*this.splitIndex,(index+1)*this.splitIndex)
            const yi = y.slice((index)*this.splitIndex,(index+1)*this.splitIndex)
            this.models[index].train(xi,yi)
        }
        const xi = x.slice((this.segments-1)*this.splitIndex)
        const yi = y.slice((this.segments-1)*this.splitIndex)
        this.models[this.segments-1].train(xi,yi)
        
    }

    predict(x: number[]){
        const out: number[] = []
        for (let index = 0; index < this.segments-1; index++) {
            const xi = x.slice((index)*this.splitIndex,(index+1)*this.splitIndex);
            this.models[index].predict(xi).forEach(element => out.push(element));

        }
        const xi = x.slice((this.segments-1)*this.splitIndex);
        this.models[this.segments-1].predict(xi).forEach(element => out.push(element));
        console.log(out);
        return out;
    }


}

export class DataPoint{
    index: number;
    daily: number | undefined;
    date: string;
    predicted: number| undefined;

    constructor(index:number,daily:number|undefined =undefined,date:string){
        this.index = index;
        this.daily = daily;
        this.date = date;
    }

    addPrediction(value: number){
        this.predicted = value;
    }
}

export class Data {

    data: DataPoint[]; 
    model: LinearRegression | SegmentedLinearRegression;

    constructor(model: LinearRegression | SegmentedLinearRegression){
        this.data = [];
        this.model = model;
    }

    addDataPoint(daily: number, date: string){
        if (this.data.length<1){
            this.data.push(new DataPoint(0,daily,date));
        } else{
            this.data.push(new DataPoint(this.data.at(-1)!.index+1,daily,date))
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
                last.setDate(last.getDate() + 1);
                const date = `${last.getFullYear()}-${('0'+last.getMonth()).slice(-2)}-${('0'+last.getDate()).slice(-2)}`;
                const xi = (i.index+index);
                x.push(xi)
                inp.push(new DataPoint(xi,undefined,date));
            }
        }
        const predicted: number[] = this.model.predict(x);
        console.log(predicted);
        for (let index = 0; index < predicted.length; index++) {
            inp[index].addPrediction(predicted[index])
        }
        return inp;
    }

}
