import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

// @route    GET api/goals
// @desc     Get all goals
// @access   Public

const getGoals = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ message: 'Get goals' });
};

// @route    POST api/goals
// @desc     Set goal
// @access   Public

const setGoal = (req: Request, res: Response, next: NextFunction) => {
  console.log(!req.body.text);
  throw new Error('Please add a text field');
};

// @route    PUT api/goals/:id
// @desc     Update goal
// @access   Private

const updateGoal = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ message: 'Update goal' });
};

// @route    DELETE api/goals/:id
// @desc     Delete goal
// @access   Private

const deleteGoal = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ message: 'Delete goal' });
};

export default { getGoals, setGoal, updateGoal, deleteGoal };
