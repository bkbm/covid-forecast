import Post from "../models/post";
import { Response, Request } from "express";

export const createPost = async (req : Request ,res : Response) => {
    try {
        const post = new Post(req.body);
        await post.save();
        res.status(201).json(post);
    } catch(error) {
        res.status(400).json({success: false, error});
    }
}

export const getPost = async (req: Request, res: Response) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);

    }catch(error){
        res.status(400).json({success: false, error});
    }
}

export const updatePost = async (req : Request, res : Response) => {

    const allowedOption = ['title', 'content', 'tag', 'author'];
    const selectedOption = Object.keys(req.body);

    const doesExists = selectedOption.every(option =>allowedOption.includes(option))
    if (!doesExists){
        res.status(404).json({success: false, error: 'Not Found'});
    
    }

    try {
        const post = await Post.findById({ _id: req.params.id});
        selectedOption.forEach(option => post[option] = req.body[option])
        await post.save();
        res.status(200).json(post)
    } catch(error){
        res.status(400).json({success: false, error})
    }
}
