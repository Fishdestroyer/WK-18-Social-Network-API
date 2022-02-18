const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

const ThoughtsSchema = new Schema(
    {
        //New schema for thoughts
        thoughtText: {
            type: String,
            required: true
        },

        createdAt: {
            type: Date,
            default: Date.now,
            //Used moment.js for time and date stamp
            get: createdAtVal => moment(createdAtVal).format('MMMM Do YYYY, h:mm:ss a')
        },
        writtenBy: {
            type: String,
            required: true,
            trim: true
        },
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

const ReactionSchema = new Schema(
    {
        // set custom id to avoid confusion with parent comment _id
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true
        },
        writtenBy: {
            type: String,
            required: true,
            trim: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => moment(createdAtVal).format('MMMM Do YYYY, h:mm:ss a')
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
)

ThoughtsSchema.virtual('reactionCount').get(function(){
    return this.reaction.length;
});

const Thoughts = model('Thoughts', ThoughtsSchema);

module.exports = Thoughts 
