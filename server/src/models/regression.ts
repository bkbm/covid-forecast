import mongoose from 'mongoose';
const deathSchema = new mongoose.Schema({
    "regression": {"b": Number, "c": Number}
},{timestamps: true});