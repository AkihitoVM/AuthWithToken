const { Schema, model } = require('mongoose')

var User = new Schema({
    user: {
        type: String,
        unique: true,
        required: true
    },
    hashPassword: {
        type: String,
        required: true
    },
    refToken: [{
        type: Schema.Types.ObjectId,
        ref: 'AccessToken'
    }]
})

module.exports = model('User', User)