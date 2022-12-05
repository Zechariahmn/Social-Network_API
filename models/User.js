const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    // username field
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      max_length: 50,
    },

    // email field
    email: {
      type: String,
      unique: true,
      required: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        max_length: 50,
    },

    // thoughts field
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],

    // friends field
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },

  {
    toJSON: {
      virtuals: true,
      //getters: true,
    },
    id: false,
  }
);

// retrieves the length of the user's friends array field on query
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('User', userSchema);

// exports the User model
module.exports = User;