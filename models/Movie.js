const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        // maybe delete required, as may have other auths outside of google
        required: true,
        unique: true,
        dropDups: true
    },

    poster_path: {
        type: String,
        required: false,
        dropDup: true
    },
    directors: {
        type: Array,
        required: false,
        dropDup: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now,
      }

});

MovieSchema.plugin(uniqueValidator);

// Create collection / add schema
module.exports = mongoose.model('Movie', MovieSchema);