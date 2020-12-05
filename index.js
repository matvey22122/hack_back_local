import express from 'express'
import mongoose from 'mongoose'
import config from 'config'
import router from "./router";
import cors from 'cors'


const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

app.use(cors())
app.use(express.json())
app.use(router)
app.io = io

const PORT = config.get("PORT") || 7000

const start = async () => {
    try {
        await mongoose.connect(config.get("mongoUri"), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        io.on('connection', (socket) => {
            console.log('a user connected');
        })

        server.listen(PORT, () => {
            console.log('Start server');
        });
    } catch (e) {
        console.log(e.message)
        process.exit(1)
    }
}

start()