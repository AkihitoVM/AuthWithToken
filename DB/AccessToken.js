const {Schema, model} = require('mongoose')

var AccessToken = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    token: {
        type: String,
        unique: true,
        index: true
    },
    created: {
        type: Date,
        default: Date.now
    }
})

module.exports = model('AccessToken', AccessToken);

