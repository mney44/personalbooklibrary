const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BooklistSchema = new Schema({
    title: {
        type: String,
        required: true

    }, 
    comment: {
        type: String,
        required: true
    }
})