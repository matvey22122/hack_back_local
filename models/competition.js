import mongoose from "mongoose";

const Schema = mongoose.Schema

const competitionSchema = new Schema({
    title: {
        type: String
    },
    date: {
        type: String
    },
    place: {
        type: String
    },
})

const Competition = mongoose.model('Secretary', competitionSchema)

const createCompetition = async (competitionData) => {
    const competition = new Competition(competitionData)
    return await competition.save()
}

export {
    createCompetition
}
