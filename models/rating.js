import mongoose from "mongoose";

const Schema = mongoose.Schema

const ratingSchema = new Schema({
    score: {
        type: Number,
        required: true,
        default: 0
    },
    Judge: {
        type: Schema.Types.ObjectId,
        ref: 'Judge',
        required: true
    },
    Member: {
        type: Schema.Types.ObjectId,
        ref: 'Member',
        required: true
    }
})

const Rating = mongoose.model('Rating', ratingSchema)

const createRating = async (ratingData) => {
    const rating = new Rating(ratingData)
    return await rating.save()
}

const allRatings = async () => {
    return Rating.find()
}

export {
    createRating,
    allRatings
}

