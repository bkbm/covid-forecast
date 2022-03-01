"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const posts_js_1 = require("../controllers/posts.js");
router.get('/', posts_js_1.getPosts);
router.post('/', posts_js_1.createPost);
router.patch('/:id', posts_js_1.updatePost);
router.delete('/:id', posts_js_1.deletePost);
exports.default = router;
//# sourceMappingURL=posts.js.map