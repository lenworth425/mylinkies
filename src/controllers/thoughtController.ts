import { Thought, User } from "../models/index.js";
import { Request, Response } from "express";

export const getThoughts = async (_req: Request, res: Response) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const getSingleThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findOne({ _id: req.params.thoughtId});

    if (!thought) {
      return res.status(404).json({ message: 'No thought found with this id!' });
    }

    res.json(thought);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const createThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.create(req.body);
    const user = await User.findOneAndUpdate(
        { _id: thought.userId},
        {$addToSet: { thoughts: thought._id }},
        { new: true }
    );

    if (!user) {
      return res.status(404).json({ 
        message: 'Thought Created, but no user found with that id!' });
    }

    user.thoughts.push(thought._id);
    await user.save();
    res.json(thought);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const updateThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findOneAndUpdate({_id: req.params.thoughtId}, req.body, { new: true });

    if (!thought) {
      return res.status(404).json({ message: 'No thought found with this id!' });
    }

    res.json(thought);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const deleteThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findOneAndDelete({_id: req.params.thoughtId});
    const user = await User.findOne({_id: thought.userId});

    if (!thought) {
      return res.status(404).json({ message: 'No thought found with this id!' });
    }

    user.thoughts.pull(thought._id);
    await user.save();
    res.json(thought);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const addReaction = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findOneAndUpdate({_id: req.params.thoughtId}, { $push: { reactions: req.body } }, { new: true });

    if (!thought) {
      return res.status(404).json({ message: 'No thought found with this id!' });
    }

    res.json(thought);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const deleteReaction = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findOneAndUpdate(
        {_id: req.params.thoughtId}, { $pull: { reactions: { reactionId: req.params.reactionId } } }, { new: true }
    );

    if (!thought) {
      return res.status(404).json({ message: 'No thought found with this id!' });
    }
    
    res.json(thought);
    } catch (err) {
    res.status(400).json(err);
    }
};