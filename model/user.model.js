const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 1024,
  },
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 255,
  },
  phone: {
    type: Number,
  },
  role: {
    type: Array,
    required: true,
    minlength: 1,
    maxlength: 255,
  },
  type: {
    type: String,
    default: "Admin",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const validateUserRegisteration = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(1).max(255).required(),
    email: Joi.string().min(1).max(255).required().email(),
    phone: Joi.number().strict(10).required(),
    password: Joi.string().min(6).max(1024).required(),
    role: Joi.array().min(1).max(255).required(),
    type: Joi.string().min(1).max(255),
  });
  return schema.validate(user);
};

const validateUserLogin = (user) => {
  const schema = Joi.object({
    email: Joi.string().email().required().min(1).max(255).messages({
      "string.empty": "Email is required",
      "string.min": "Email is too short",
      "string.max": "Email is too long",
      "string.email": "Email is invalid",
    }),
    password: Joi.string().required().min(6).max(1024).messages({
      "string.base": "Password must be a string",
      "string.empty": "Password must not be empty",
      "string.min": "Password must be at least 6 characters",
      "string.max": "Password must be at most 1024 characters",
    }),
  });
  return schema.validate(user);
};

const User = mongoose.model("users", userSchema);

module.exports = { User, validateUserRegisteration, validateUserLogin };
