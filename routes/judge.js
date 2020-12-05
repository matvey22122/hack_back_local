import express from "express";
import {isAuth, createJudge} from "../models/judge";
import {getIdByLogin} from "../models/judge";
import {createRating} from "../models/rating";
import {createMember} from "../models/member";

const router = express.Router()

router.post('/login', async (req, res) => {
    try {
        if (!req.body) {
            res.status(400).send()
        }

        const {login, password} = req.body

        if (await isAuth(login, password)) {
            res.status(200).send(true)
        } else {
            res.status(400).send()
        }
    } catch (e) {
        console.log(e)
        res.status(400).send()
    }
})

router.post('/estimate', async (req, res) => {
    try {
        const {Member, login, score} = req.body
        const Judge = await getIdByLogin(login)
        await createRating({score, Member, Judge})
        res.status(200).send()
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/create', async (req, res) => {
    const data = req.body

    await createJudge(data)

    res.status(200).send()
})

router.post('/createMember', async (req, res) => {
    const data = req.body

    await createMember(data)

    res.status(200).send()
})

export default router
