const User = require("../models/userSchema");
const { generateAlias, generateCvu } = require("../helpers/generators");
const Balance = require("../models/balanceSchema");
const mongoose = require("mongoose");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: 200,
      message: "All users",
      data: users,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const registerUser = async (req, res) => {
  const { name, lastname, email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        status: 400,
        message: "User already exists",
      });
    }

    const alias = generateAlias(name, lastname);
    const cvu = generateCvu(email);

    const newUser = new User({ name, lastname, email, password, alias, cvu });
    await newUser.save();

    const balance = new Balance({ user: newUser._id });
    await balance.save();

    res.status(201).json({
      status: 201,
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
      });
    }
    res.status(200).json({
      status: 200,
      message: "User deleted successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getUserByCvuOrAlias = async (req, res) => {
  const { destination } = req.params;

  try {
    const destinationUser = await User.findOne({
      $or: [{ alias: destination }, { cvu: destination }],
    });
    //chequear cual codigo corresponde
    if (!destinationUser) {
      return res.status(404).json({
        status: 404,
        message: "Destination user not found",
        destinationUser: false,
      });
    }
    res.status(200).json({
      status: 200,
      message: "Destination user found",
      destinationUser: {
        name: destinationUser.name,
        lastname: destinationUser.lastname,
        _id: destinationUser._id,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: error.message,
    });
  }
};

//testing

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "Email not found",
      });
    }

    if (user.password !== password) {
      return res.status(400).json({
        status: 400,
        message: "Incorrect password",
      });
    }

    const userResponse = {
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      alias: user.alias,
      cvu: user.cvu,
      _id: user._id,
    };

    res.status(200).json({
      status: 200,
      message: "User found",
      user: userResponse,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const createBalanceById = async (req, res) => {
  const { user } = req.params;

  try {
    const balance = new Balance({ user: user });
    await balance.save();
    res.status(201).json({
      status: 201,
      message: "Balance created successfully",
      balance,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  getAllUsers,
  registerUser,
  deleteUser,
  createBalanceById,
  getUserByCvuOrAlias,
  login,
};
