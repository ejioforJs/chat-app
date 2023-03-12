const mongoose = require('mongoose');

const notifModel = mongoose.Schema(
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message',
  },
  {
    timestamps: true,
  }
);

const Notif = mongoose.model('Notif', notifModel);
module.exports = Notif;
