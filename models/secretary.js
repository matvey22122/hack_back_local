import mongoose from "mongoose";
import {v4} from "uuid";

const Schema = mongoose.Schema

const secretarySchema = new Schema({
    login: {
        type: String
    },
    password: {
        type: String,
        default: v4()
    }
})

const Secretary = mongoose.model('Secretary', secretarySchema)
