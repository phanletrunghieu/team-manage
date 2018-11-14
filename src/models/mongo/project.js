var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
    },
    creator: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    members: [{type: Schema.Types.ObjectId, ref: 'User'}],
    date_created: {
        type: Date,
        default: Date.now
    },
    date_updated: {
        type: Date,
        default: Date.now
    }
});

ProjectSchema.pre('save', next => {
    if (this.isNew || this.isModified) {
        this.date_updated = Date.now();
    }
    return next();
});

module.exports = mongoose.model('Project', ProjectSchema);
