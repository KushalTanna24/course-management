const {
  User,
  validateUserLogin,
  validateUserRegisteration,
} = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  console.log("reached here");
  const { error } = validateUserLogin(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({
    email: req.body.email,
  });

  if (!user)
    return res.json({
      message: "User not found",
      ok: false,
      status: 400,
      isLogin: false,
    });

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
      status: "200",
      message: "Login Successful",
      ok: true,
      isLogin: true,
      token,
    });
  } else {
    return res.json({
      status: "400",
      message: "Invalid Password",
      isLogin: false,
      ok: false,
    });
  }
};

const register = async (req, res) => {
  const { error } = validateUserRegisteration(req.body);
  if (error)
    return res.json({
      ok: false,
      status: 400,
      message: error.details[0].message,
      isRegister: false,
    });

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
    return res.json({
      ok: false,
      status: 400,
      message: "Registeration fail",
      isRegister: false,
    });
  }
  res.json({
    ok: true,
    status: 200,
    message: "Registeration Successful",
    isRegister: true,
  });
};

module.exports = {
  login,
  register,
};
