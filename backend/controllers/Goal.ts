import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Goal from '../models/Goal';

// @route    GET api/goals
// @desc     Get all goals
// @access   Private

const getGoals = (req: Request, res: Response, next: NextFunction) => {
  return Goal.find()
    .then(goals => res.status(200).json({ goals }))
    .catch(error => res.status(500).json({ error }));
};

// @route    POST api/goals
// @desc     Set goal
// @access   Private

const setGoal = (req: Request, res: Response, next: NextFunction) => {
  const { text } = req.body;
  if (!text) {
    throw new Error('Please add a text field');
  }

  const goal = new Goal({
    _id: new mongoose.Types.ObjectId(),
    text,
  });
  return goal
    .save()
    .then(goal => res.status(201).json({ goal }))
    .catch(error => res.status(500).json({ error }));
};

// @route    PUT api/goals/:id
// @desc     Update goal
// @access   Private

const updateGoal = (req: Request, res: Response, next: NextFunction) => {
  const goalId = req.params.id;

  return Goal.findByIdAndUpdate(goalId, req.body, { new: true })
    .then(updatedGoal => (updatedGoal ? res.status(200).json(updatedGoal) : res.status(404).json({ message: 'Not found' })))
    .catch(error => res.status(500).json({ error }));
};

// @route    DELETE api/goals/:id
// @desc     Delete goal
// @access   Private

const deleteGoal = (req: Request, res: Response, next: NextFunction) => {
  const goalId = req.params.id;

  return Goal.findByIdAndDelete(goalId)
    .then(goal => (goal ? res.status(201).json({ id: req.params.id }) : res.status(404).json({ message: 'Not found' })))
    .catch(error => res.status(500).json({ error }));
};

export default { getGoals, setGoal, updateGoal, deleteGoal };
