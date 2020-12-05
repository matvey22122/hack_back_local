import mongoose from "mongoose";

const Schema = mongoose.Schema

const memberSchema = new Schema({
    fio: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: String,
        required: true
    },
    rank: {
        type: String
    },
    toRank: {
        type: String
    }
})

const Member = mongoose.model('Member', memberSchema)

const createMember = async (memberData) => {
    const member = new Member(memberData);
    return await member.save()
}

const allMembers = async () => {
    return Member.find();
}

const getMemberByIndex = async (index) => {
    const members = await Member.find()
    if (members.length - 1 >= index) {
        return members[index]
    } else {
        return {}
    }
}

export {
    createMember,
    allMembers,
    getMemberByIndex
}
