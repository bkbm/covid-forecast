"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Data = exports.DataPoint = exports.SegmentedLinearRegression = exports.LinearRegression = void 0;
class LinearRegression {
    constructor() {
        this.m = 0;
        this.b = 0;
    }
    train(x, y) {
        this.m = this.covariance(x, y) / this.variance(x);
        this.b = this.mean(y) - this.m * this.mean(x);
    }
    predict(x) {
        const out = [];
        x.forEach(element => out.push((this.m * element) + this.b));
        return out;
    }
    mean(data) {
        let sum = 0;
        data.forEach(element => {
            sum = sum + element;
        });
        return sum / data.length;
    }
    variance(data) {
        const mean = this.mean(data);
        let sum = 0;
        data.forEach(element => sum = sum + (Math.pow((element - mean), 2)));
        return sum;
    }
    covariance(x, y) {
        const xmean = this.mean(x);
        const ymean = this.mean(y);
        let sum = 0;
        for (let index = 0; index < x.length; index++) {
            sum = sum + ((x[index] - xmean) * (y[index] - ymean));
        }
        return sum;
    }
}
exports.LinearRegression = LinearRegression;
class SegmentedLinearRegression {
    constructor(segments) {
        this.segments = segments;
        this.models = [];
        this.splitIndex = 0;
        for (let i = 0; i < segments; i++) {
            this.models.push(new LinearRegression());
        }
    }
    train(x, y) {
        this.splitIndex = Math.floor(x.length / this.segments);
        for (let index = 0; index < this.segments - 1; index++) {
            const xi = x.slice((index) * this.splitIndex, (index + 1) * this.splitIndex);
            const yi = y.slice((index) * this.splitIndex, (index + 1) * this.splitIndex);
            this.models[index].train(xi, yi);
        }
        const xi = x.slice((this.segments - 1) * this.splitIndex);
        const yi = y.slice((this.segments - 1) * this.splitIndex);
        this.models[this.segments - 1].train(xi, yi);
    }
    predict(x) {
        const out = [];
        for (let index = 0; index < this.segments - 1; index++) {
            const xi = x.slice((index) * this.splitIndex, (index + 1) * this.splitIndex);
            this.models[index].predict(xi).forEach(element => out.push(element));
        }
        const xi = x.slice((this.segments - 1) * this.splitIndex);
        this.models[this.segments - 1].predict(xi).forEach(element => out.push(element));
        console.log(out);
        return out;
    }
}
exports.SegmentedLinearRegression = SegmentedLinearRegression;
class DataPoint {
    constructor(index, daily = undefined, date) {
        this.index = index;
        this.daily = daily;
        this.date = date;
    }
    addPrediction(value) {
        this.predicted = value;
    }
}
exports.DataPoint = DataPoint;
class Data {
    constructor(model) {
        this.data = [];
        this.model = model;
    }
    addDataPoint(daily, date) {
        if (this.data.length < 1) {
            this.data.push(new DataPoint(0, daily, date));
        }
        else {
            this.data.push(new DataPoint(this.data.at(-1).index + 1, daily, date));
        }
    }
    setModel(model) {
        this.model = model;
    }
    train() {
        const x = [];
        const y = [];
        for (let index = 0; index < this.data.length; index++) {
            const element = this.data[index];
            x.push(element.index);
            y.push(element.daily);
        }
        this.model.train(x, y);
    }
    cloneData() {
        return this.data.map((x) => x);
    }
    predict(forecast) {
        const inp = this.cloneData();
        const x = [];
        inp.forEach(element => x.push(element.index));
        const i = inp.at(-1);
        if (forecast > 0) {
            for (let index = 1; index < forecast + 1; index++) {
                const last = new Date(i.date);
                last.setDate(last.getDate() + 1);
                const date = `${last.getFullYear()}-${('0' + last.getMonth()).slice(-2)}-${('0' + last.getDate()).slice(-2)}`;
                const xi = (i.index + index);
                x.push(xi);
                inp.push(new DataPoint(xi, undefined, date));
            }
        }
        const predicted = this.model.predict(x);
        console.log(predicted);
        for (let index = 0; index < predicted.length; index++) {
            inp[index].addPrediction(predicted[index]);
        }
        return inp;
    }
}
exports.Data = Data;
//# sourceMappingURL=types.js.map