import pkg from "mongoose";
const { Schema, model } = pkg;
import abc from 'bcryptjs';
const { compare, genSalt, hash } = abc;

const userSchema = Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    pic: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }

  const salt = await genSalt(10);
  this.password = await hash(this.password, salt);
});

const User = model("User", userSchema);
export default User;
