const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema({
  handle: {type: String, required: true, unique: true},
  nickname: {type: String, required: true},
  stats: {type: Mixed}
})

module.exports = mongoose.model('Player', PlayerSchema);
