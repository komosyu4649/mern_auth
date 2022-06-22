const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this.id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "14d",
  });
  return token;
};

const User = mongoose.model("user", userSchema);

const validate = (data) => {
  const schema = joi.object({
    firstName: joi.string().required().label("first name"),
    lastName: joi.string().required().label("last name"),
    email: joi.string().required().label("email"),
    password: passwordComplexity().required.label("password"),
  });
  return schema.validate(data);
};

module.exports = { User, validate };
