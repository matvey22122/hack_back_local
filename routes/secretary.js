import express from "express";
import {getMemberByIndex, allMembers} from "../models/member";
import {allJudges} from "../models/judge";
import {allRatings} from "../models/rating";

const router = express.Router()

let index = 0;

router.get('/download', (req, res) => {
    const file = `${__dirname}/go.html`
    res.download(file)
})

router.get('/members', async (req, res) => {
    try {
        const data = await allMembers()
        res.status(200).send(data)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/judges', async (req, res) => {
    try {
        const data = await allJudges()
        res.status(200).send(data)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/ratings', async (req, res) => {
    try {
        const data = await allRatings()
        res.status(200).send(data)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/judge_logout', async (req, res) => {
    try {
        const {login} = req.body
        req.app.io.emit('JudgeLogout', {login});
        res.status(200).send()
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/start_competition', async (req, res) => {
    try {
        index = 0;
        const member = await getMemberByIndex(index)
        req.app.io.emit('UpdateMember', member)
        res.status(200).send()
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/next_member', async (req, res) => {
    try {
        index++;
        const member = await getMemberByIndex(index)
        req.app.io.emit('UpdateMember', member)
        res.status(200).send()
    } catch (e) {
        res.status(400).send(e)
    }
})

export default router
