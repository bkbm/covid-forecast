"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataHandler = void 0;
const Data_1 = require("./Data");
class DataHandler {
    constructor(model) {
        this.data = [];
        this.model = model;
    }
    addDataPoint(daily, date) {
        if (this.data.length < 1) {
            this.data.push(new Data_1.DataPoint(0, date, daily));
        }
        else {
            this.data.push(new Data_1.DataPoint(this.data.at(-1).index + 1, date, daily));
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
                last.setDate(last.getDate() + index);
                const date = `${last.getFullYear()}-${('0' + (last.getMonth() + 1)).slice(-2)}-${('0' + last.getDate()).slice(-2)}`;
                const xi = (i.index + index);
                x.push(xi);
                inp.push(new Data_1.DataPoint(xi, date, undefined));
            }
        }
        const predicted = this.model.predict(x);
        /*         console.log(predicted); */
        for (let index = 0; index < predicted.length; index++) {
            inp[index].addPrediction(predicted[index]);
        }
        return inp;
    }
}
exports.DataHandler = DataHandler;
//# sourceMappingURL=DataHandler.js.map