import pkg from "mongoose";
const { Schema, model } = pkg;

const notifModel = Schema(
  {
    type: Schema.Types.ObjectId,
    ref: 'Message',
  },
  {
    timestamps: true,
  }
);

const Notif = model('Notif', notifModel);
export default Notif;
