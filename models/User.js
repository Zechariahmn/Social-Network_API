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