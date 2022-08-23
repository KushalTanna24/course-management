const {
  User,
  validateUserLogin,
  validateUserRegisteration,
} = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  const { error } = validateUserLogin(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({
    email: req.body.email,
  });

  if (!user) return res.json({ message: "User not found" }).status(400);

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (isPasswordValid) {
    const token = jwt.sign(
      {
        name: user.name,
        role: user.role,
      },
      "verySecretKey1"
    );

    res.json({
      status: "success",
      message: "Login Successful",
      token,
    });
  } else {
    return res
      .json({
        status: "error",
        message: "Invalid Password",
      })
      .status(400);
  }
};

const register = async (req, res) => {
  const { error } = validateUserRegisteration(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const newPassword = await bcrypt.hash(req.body.password, 10);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    password: newPassword,
    role: req.body.role,
    type: req.body.type,
    createdAt: Date.now(),
  });
  const result = await user.save();
  if (!result) {
    return res.status(400).send("Product not saved");
  }
  res.send(result);
};

module.exports = {
  login,
  register,
};
