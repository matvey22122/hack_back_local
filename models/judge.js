import mongoose from "mongoose";
import {v4} from "uuid";

const Schema = mongoose.Schema

const judgeSchema = new Schema({
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        default: v4(),
        required: true
    },
    fio: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
})

const Judge = mongoose.model('Judge', judgeSchema)

const isAuth = async (login, password) => {
    const judge = await Judge.findOne({login})

    return judge.password === password
}

const allJudges = async () => {
    return Judge.find();
}

const createJudge = async (data) => {
    const judge = new Judge(data)
    return await judge.save()
}

const getIdByLogin = async (login) => {
    const judge = await Judge.findOne({login})
    return judge._id
}

export {
    isAuth,
    allJudges,
    createJudge,
    getIdByLogin
}

