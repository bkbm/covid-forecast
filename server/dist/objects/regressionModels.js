"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SegmentedLinearRegression = exports.LinearRegression = void 0;
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
        x.forEach(element => {
            const temp = (this.m * element) + this.b;
            if (temp > 0)
                out.push(temp);
            else
                out.push(0);
        });
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
        console.log((this.segments - 1) * this.splitIndex);
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
        /* console.log(out); */
        return out;
    }
}
exports.SegmentedLinearRegression = SegmentedLinearRegression;
//# sourceMappingURL=regressionModels.js.map