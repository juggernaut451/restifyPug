const mongoose = require('mongoose');
const mongooseStringQuery = require('mongoose-string-query');
const timestamps = require('mongoose-timestamp');


const UserSchema = new mongoose.Schema(
    {
        "name": {
            "type": "string",
            "required": true
        },
        "phone": {
            "type": "string",
            "required": true
        },
        "email": {
            "type": "string",
            "required": true
        }
    },
    { minimize: false },
)

UserSchema.plugin(timestamps)
UserSchema.plugin(mongooseStringQuery)

const User = mongoose.model('User', UserSchema)
module.exports = User;
