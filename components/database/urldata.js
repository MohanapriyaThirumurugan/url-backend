import mongoose from "mongoose";

const urlschema = new mongoose.Schema({
  bigurl: {
    type: String,
    required: true
  },
  smallurl: {
    type: String,
    required: true
  },
  click: {
    type: Number,
    default: 0
  }
});

const urlmodel = mongoose.model('urluser', urlschema);

export default urlmodel;
