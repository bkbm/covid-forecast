"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.updatePost = exports.getPosts = exports.createPost = void 0;
const post_1 = __importDefault(require("../models/post"));
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = new post_1.default(req.body);
        yield post.save();
        res.status(201).json(post);
    }
    catch (error) {
        res.status(400).json({ success: false, error });
    }
});
exports.createPost = createPost;
const getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield post_1.default.find();
        res.status(200).json(posts);
    }
    catch (error) {
        res.status(400).json({ success: false, error });
    }
});
exports.getPosts = getPosts;
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allowedOption = ['title', 'content', 'tag', 'author'];
    const selectedOption = Object.keys(req.body);
    const doesExists = selectedOption.every(option => allowedOption.includes(option));
    if (!doesExists) {
        res.status(404).json({ success: false, error: 'Not Found' });
    }
    try {
        const post = yield post_1.default.findById({ _id: req.params.id });
        selectedOption.forEach(option => post[option] = req.body[option]);
        yield post.save();
        res.status(200).json(post);
    }
    catch (error) {
        res.status(400).json({ success: false, error });
    }
});
exports.updatePost = updatePost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield post_1.default.findOneAndDelete({ _id: req.params.id });
        res.status(200).json("Post was deleted");
    }
    catch (error) {
        res.status(404).json({ success: false, error });
    }
});
exports.deletePost = deletePost;
//# sourceMappingURL=posts.js.map