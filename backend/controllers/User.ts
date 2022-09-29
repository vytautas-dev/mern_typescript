import { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import User from '../models/User';
import { IGetUserAuthInfoRequest } from '../interfaces/User';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || '';

// @route    POST api/users/register
// @desc     Register User
// @access   Public

const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    const error = new Error('Please add all fields');
    console.error(error);
    return res.status(400).json({ message: error.message });
  }

  // Check if user exists
  const userExists = await User.findOne({ email }); //
  if (userExists) {
    const error = new Error('User already exists');
    console.error(error);
    return res.status(400).json({ message: error.message });
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    _id: new mongoose.Types.ObjectId(),
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    const error = new Error('Invalid user data');
    console.error(error);
    return res.status(400).json({ message: error.message });
  }
};

// @route    POST api/users/login
// @desc     Authenticate a User
// @access   Public

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  const isValid = await bcrypt.compare(password, user!.password);

  if (user && isValid) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    const error = new Error('Invalid credentials');
    console.error(error);
    return res.status(400).json({ message: error.message });
  }
};

// @route    GET api/users/me
// @desc     Get user data
// @access   Private

const getMe = async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
  res.status(200).json(req.user);
};

// Generate JWT
const generateToken = (id: string): string => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: '30d',
  });
};

export default { registerUser, loginUser, getMe };
