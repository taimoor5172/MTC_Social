const mongoose = require('mongoose');

const PasswordResetTokensSchema = new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    token: { type: String },
    date: {
        type: Date,
        default: Date.now,
        expires: 300
    }
});

module.exports = mongoose.model('PasswordResetTokensSchema', PasswordResetTokensSchema);