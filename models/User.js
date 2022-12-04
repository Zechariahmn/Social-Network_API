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