const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

// reaction schema only
const ReactionSchema = new Schema(
    {
      // set custom id to avoid confusion with parent comment _id
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
      },

      //has a min. of 1 and a max. of 280
      reactionBody: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 280
      },

      //Username field
      username: {
        type: String,
        required: true,
      },

      //all reactions will have a time stamp in a specific format on query
      createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
      }
    },

    {
      toJSON: {
        getters: true
      }
    }
  );

  //thought schema
  const ThoughtSchema = new Schema (
    {
        
        //thought-text field that has a min. of 1 and a max. of 280
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },

        // CreatedAt field will be time stamped with the current time
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
        },

        //username field
        username: {
            type: String,
            required: true,
            ref: 'User'
        },

        //// array of nested documents created with the reactionSchema
        reactions: [ReactionSchema],
    },

    {
      toJSON: {
        virtuals: true,
        getters: true
      },

      id: false
  }
)

// get total count of friends on retrieval
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
  });

  const Thought = model('Thought', ThoughtSchema);

  module.exports = Thought;

