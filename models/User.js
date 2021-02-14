const {Schema, model, Types} = require('mongoose');

const UserSchema = new Schema( {
    username: {
        type: String,
        unique: true,
        required: true,
        trimmed: true     
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match:	/([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})/
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
},

{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
}
);
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;