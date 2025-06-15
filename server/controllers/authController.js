const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateToken = (user) =>
  jwt.sign(
    { id: user._id, name: user.name, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.create({ name, email, password });
    const token = generateToken(user);
    res
      .status(201)
      .json({ user: { name: user.name, email: user.email }, token });
  } catch (err) {
    res.status(400).json({ error: "Registration failed", detail: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = generateToken(user);
    res
      .status(200)
      .json({ user: { name: user.name, email: user.email }, token });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
};
