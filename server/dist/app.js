"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const posts_1 = __importDefault(require("./routes/posts"));
const deaths_1 = __importDefault(require("./routes/deaths"));
const data_1 = __importDefault(require("./routes/data"));
require("./db/db.js");
app.use('/posts', posts_1.default);
app.use('/deaths', deaths_1.default);
app.use('/data', data_1.default);
app.listen(8000);
//# sourceMappingURL=app.js.map