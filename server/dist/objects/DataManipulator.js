"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Data_1 = require("./Data");
class DataManipulator {
    constructor() {
        this.data = new Data_1.Data();
    }
    toSeries() {
        const daily = this.data.getColumn('daily');
        const date = this.data.getColumn('date');
        return { date: date, y: daily };
    }
    addData(data) {
        data.forEach(element => this.data.addDataPoint(element));
    }
    createNextDate(current, days) {
        const date = new Date(current);
        date.setDate(date.getDate() + days);
        return date.toISOString().split('T')[0];
    }
    createNextWeeks(weeks) {
        const out = this.data.copyOf();
        const today = this.data.lastDataPoint();
        const lastIndex = today[0].index;
        const lastDate = today[0].date;
        for (let index = 1; index <= weeks; index++) {
            out.addDataPoint(new Data_1.DataPoint(lastIndex + index, this.createNextDate(lastDate, index)));
        }
        return out;
    }
}
//# sourceMappingURL=DataManipulator.js.map