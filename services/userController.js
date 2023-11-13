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

    // Validasi email dan password
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Cek apakah email sudah terdaftar (case-insensitive)
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

    // Hash password menggunakan bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan data ke database menggunakan Sequelize
    const createdUser = await userModels.create({
      email: email.toLowerCase(), // Mengubah email menjadi lowercase sebelum disimpan
      password: hashedPassword, // Simpan password yang di-hash
    });

    // Kirim respons berhasil bersama dengan token JWT
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

    // Temukan pengguna berdasarkan email
    const user = await userModels.findOne({
      where: {
        email: email,
      },
    });

    // Jika pengguna tidak ditemukan
    if (!user) {
      return res
        .status(401)
        .json({ message: "Email or password is incorrect" });
    }

    // Bandingkan password yang diberikan dengan password di database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res
        .status(401)
        .json({ message: "Email or password is incorrect" });
    }

    // Jika login berhasil, generate token
    const token = generateToken(user);

    // Kirim respons berhasil bersama dengan token JWT
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
  // console.log("Generated Token:", token);
  return token;
}
module.exports = {
  register,
  login,
  getAllUsers,
  getdetailUsers,
};
