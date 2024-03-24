const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

const signupUser = async (req, res) => {
  const { name, email, mobile, password } = req.body;
  try {
    if (!name || !email || !mobile || !password) {
      return res.status(400).json({
        errorMessage: "All fields required",
      });
    }

    const isExistingUser = await User.findOne({ email });
    if (isExistingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = await User.create({
      name,
      email,
      mobile,
      password: hashedPassword,
      //   cart: [],
    });

    const token = jwt.sign(
      { email, password: hashedPassword },
      process.env.JWT_SECRET
      // { expiresIn: 1800 }
    );

    res.json({
      message: "User registered successfully",
      token: token,
      userid: userData._id,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "User does not exist",
      });
    }
    const loginPassword = await bcrypt.compare(password, user.password);
    if (!loginPassword) {
      return res.status(401).json({
        message: "Incorrect password, Try Again",
      });
    }
    const token = jwt.sign({ email }, process.env.JWT_SECRET);

    res.json({
      message: "User logged in successfully",
      token: token,
      name: user.name,
    });
    //     .status(200)
    //     .send({ message: "Login successful", token, userid: user._id })
    // );
  } catch (error) {
    // return res.status(503).json({
    //   message: "Wrong Email or Password",
    // });
    console.log(error);
  }
};

module.exports = { signupUser, loginUser };
