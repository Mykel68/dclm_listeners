const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: String,
  startTime: Date,
  endTime: Date,
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
