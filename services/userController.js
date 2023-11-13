const userModels = require("../models").User;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

async function getAllUsers(req, res) {
  try {
    const users = await userModels.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message || "internal server error",
    });
  }
}

async function getdetailUsers(req, res) {
  try {
    const { userId } = req.params;
    const user = await userModels.findOne({ where: { id: Number(userId) } });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message || "internal server error",
    });
  }
}

async function register(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const existingUser = await userModels.findOne({
      where: {
        email: {
          [Op.like]: email, // Case-insensitive check
        },
      },
    });

    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await userModels.create({
      email: email.toLowerCase(), 
      password: hashedPassword,
    });

    const token = generateToken(createdUser);
    res.status(201).json({
      message: "User created successfully",
      user: createdUser,
      token: token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await userModels.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Email or password is incorrect" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res
        .status(401)
        .json({ message: "Email or password is incorrect" });
    }

    const token = generateToken(user);

    res
      .status(200)
      .json({ message: "Login successful", user: user, token: token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

function generateToken(user) {
  const payload = {
    userId: user.id,
    email: user.email,
  };
  const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1h" });
  return token;
}
module.exports = {
  register,
  login,
  getAllUsers,
  getdetailUsers,
};
