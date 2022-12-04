const { Schema, model } = require('mongoose');
const moment = require('moment');

const userSchema = new Schema(
    {
      
    // username field
      username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
      },

      //email field
      email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
      },

     // includes an array of _id values referencing the Thought model
      thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
      ],
    },

    { 
        toJSON: {
          virtuals: true,
          getters: true
        },
        id: false
      }
      );

// retrieves the length of the user's friends array field on query
userSchema.virtual("friendCount").get(function () {
    return this.friends.length;
});

const User = model("User", userSchema);

// exports the User model
module.exports = User;