import express from "express";
import judge from "./routes/judge";
import secretary from "./routes/secretary";

const router = express.Router()

router.use('/judge', judge)
router.use('/secretary', secretary)

export default router