const mongoose = require('mongoose')
const Schema = mongoose.Schema

const dbSchema = new Schema ({
    roomname: {
        type: String,
        required: true,
    },
    curwords: {
        type: Array,
        required: true,
    },
    previevwords: {
        type: Array,
        required: true,
    },
    key: {
        type: Array,
        required: true,
    },
}, {timestamps: true});

const code = mongoose.model('codenames', dbSchema);
module.exports = code