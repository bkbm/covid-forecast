"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Data = exports.DataPoint = void 0;
class DataPoint {
    constructor(index, date, daily = undefined) {
        this.index = index;
        this.daily = daily;
        this.date = date;
    }
    addPrediction(value) {
        this.predicted = value;
    }
    get(key) {
        switch (key) {
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
    set(key, value) {
        switch (key) {
            case 'index':
                if (typeof value === 'number')
                    this.index = Number(value);
                break;
            case 'daily':
                if (typeof value === 'number')
                    this.daily = Number(value);
                break;
            case 'date':
                if (typeof value === 'string')
                    this.date = String(value);
        }
    }
}
exports.DataPoint = DataPoint;
class Data {
    constructor() {
        this.data = [];
    }
    getItem(index, col) {
        return this.data[index].get(col);
    }
    getRow(value, _cols = 'index') {
        return this.data.filter(item => item.get(_cols) == value);
    }
    getColumn(col) {
        const out = [];
        this.data.forEach(element => {
            out.push(element.get(col));
        });
        return out;
    }
    setItem(index, col, value) {
        this.data[index].set(col, value);
    }
    setRow(index, value) {
        this.data[index] = value;
    }
    setColumn(values, col) {
        for (let index = 0; index < this.data.length; index++) {
            this.data[index].set(col, values[index]);
        }
    }
    addDataPoint(value) {
        this.data.push(value);
    }
    lastDataPoint() {
        return this.data.slice(-1);
    }
    copyOf() {
        const out = new Data();
        out.data = [...this.data];
        return out;
    }
}
exports.Data = Data;
const getLaggedSeries = (series, lag) => {
    const dates = [];
    const y = [];
    const lagged = [];
    for (let index = lag; index < series.y.length; index++) {
        dates.push(series.date[index - lag]);
        y.push(series.y[index]);
        lagged.push(series.y[index - lag]);
    }
    return { date: dates, y: y, lagged: lagged };
};
//# sourceMappingURL=Data.js.map