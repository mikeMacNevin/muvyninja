const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        // maybe delete required, as may have other auths outside of google
        required: true
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


// Create collection / add schema
module.exports = mongoose.model('Movie', MovieSchema);