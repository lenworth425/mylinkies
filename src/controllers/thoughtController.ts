import { Thoughts, User } from "../models/index.js";
import { Request, Response } from "express";


interface ICreateThoughtBody {
  thoughtText: string;
  username: string;
  userId: string;
}

export const getThoughts = async (_req: Request, res: Response) => {
  try {
    const thoughts = await Thoughts.find();
    return res.json(thoughts);
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};

export const getSingleThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thoughts.findOne({ _id: req.params.thoughtId});

    if (!thought) {
      return res.status(404).json({ message: 'No thought found with this id!' });
    }

    return res.json(thought);
  } catch (err) {
    return res.status(400).json(err);
  }
};

export const createThought = async (req: Request<{}, {}, ICreateThoughtBody>, res: Response) => {
  try {
    const thought = await Thoughts.create(req.body);
    const user = await User.findOneAndUpdate(
        { _id: req.body.userId},
        {$addToSet: { thoughts: thought._id }},
        { new: true }
    );

    if (!user) {
      return res.status(404).json({ 
        message: 'Thought Created, but no user found with that id!' });
    }

    user.thoughts.push(thought._id as any);
    await user.save();
    return res.json(thought);
  } catch (err) {
    return res.status(400).json(err);
  }
};

export const updateThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thoughts.findOneAndUpdate({_id: req.params.thoughtId}, req.body, { new: true });

    if (!thought) {
      return res.status(404).json({ message: 'No thought found with this id!' });
    }

    return res.json(thought);
  } catch (err) {
    return res.status(400).json(err);
  }
};

export const deleteThought = async (req: Request, res: Response) => {
  try {
    const thought: any = await Thoughts.findOneAndDelete({ _id: req.params.thoughtId });

    if (!thought) {
      return res.status(404).json({ message: 'No thought found with this id!' });
    }

    const user = await User.findOne({ _id: thought.userId });

    if (user) {
      user.thoughts = user.thoughts.filter(thoughtId => thoughtId.toString() !== thought._id.toString());
      await user.save();
    }

    return res.json(thought);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const addReaction = async (req: Request, res: Response) => {
  try {
    const thought = await Thoughts.findOneAndUpdate({_id: req.params.thoughtId}, { $push: { reactions: req.body } }, { new: true });

    if (!thought) {
      return res.status(404).json({ message: 'No thought found with this id!' });
    }

    return res.json(thought);
  } catch (err) {
    return res.status(400).json(err);
  }
};

export const deleteReaction = async (req: Request, res: Response) => {
  try {
    const thought = await Thoughts.findOneAndUpdate(
        {_id: req.params.thoughtId}, { $pull: { reactions: { reactionId: req.params.reactionId } } }, { new: true }
    );

    if (!thought) {
      return res.status(404).json({ message: 'No thought found with this id!' });
    }
    
    return res.json(thought);
  } catch (err) {
    return res.status(400).json(err);
  }
};