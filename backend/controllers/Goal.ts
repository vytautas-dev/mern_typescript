import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Goal from '../models/Goal';

// @route    GET api/goals
// @desc     Get all goals
// @access   Private

const getGoals = async (req: Request, res: Response, next: NextFunction) => {
  const goals = await Goal.find({ user: req.user.id });
  res.status(200).json({
    count: goals.length,
    goals,
  });
};

// @route    POST api/goals
// @desc     Set goal
// @access   Private

const setGoal = async (req: Request, res: Response, next: NextFunction) => {
  const { text } = req.body;
  if (!text) {
    const error = new Error('Please add a text field');
    console.error(error);
    return res.status(400).json({ message: error.message });
  }

  const goal = await Goal.create({
    _id: new mongoose.Types.ObjectId(),
    text,
    user: req.user.id,
  });
  res.status(200).json(goal);
};

// @route    PUT api/goals/:id
// @desc     Update goal
// @access   Private

const updateGoal = async (req: Request, res: Response, next: NextFunction) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    const error = new Error('Goal not found');
    console.error(error);
    return res.status(400).json({ message: error.message });
  }

  // Check for user
  if (!req.user) {
    const error = new Error('User not found');
    console.error(error);
    return res.status(400).json({ message: error.message });
  }

  // Make sure the logged in user matches the goal user
  if (goal.user.toString() !== req.user.id) {
    const error = new Error('User not authorized');
    console.error(error);
    return res.status(401).json({ message: error.message });
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedGoal);
};

// @route    DELETE api/goals/:id
// @desc     Delete goal
// @access   Private

const deleteGoal = async (req: Request, res: Response, next: NextFunction) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    const error = new Error('Goal not found');
    console.error(error);
    return res.status(400).json({ message: error.message });
  }

  // Check for user
  if (!req.user) {
    const error = new Error('User not found');
    console.error(error);
    return res.status(401).json({ message: error.message });
  }

  // Make sure the logged in user matches the goal user
  if (goal.user.toString() !== req.user.id) {
    const error = new Error('User not authorized');
    console.error(error);
    return res.status(401).json({ message: error.message });
  }

  await goal.remove();

  res.status(200).json({ id: req.params.id });
};

export default { getGoals, setGoal, updateGoal, deleteGoal };
