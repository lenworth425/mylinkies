import { User, Thought } from "../models/index.js";
import { Request, Response } from "express";


export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findByPk(req.params.id, {
      include: Thought,
    });
    res.json(users);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getSingleUser = async (req: Request, res: Response) => {
    try {
      const user = await User.findOne({ _id: req.params.userid});
      res.json(user);
    } catch (error) {
      res.status(400).json({message: 'No user with that ID'});
    }
};
  
  
export const createUser = async (req: Request, res: Response) => {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (error) {
      res.status(400).json(error);
    }
};
  
export const addFriend = async (req: Request, res: Response) => {
  try {
    const user = await User.findByPk(req.params.id);
    await user.addFriend(req.params.friendId);
    res.json({ message: "Friend added" });
  } catch (error) {
    res.status(400).json({ message: 'No user with that ID' });
  }
};

export const deleteFriend = async (req: Request, res: Response) => {
  try {
    const user = await User.findOneAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "Friend not found" });
    }
    await Thought.deleteMany({ _id: { $in: user.friends } });
    res.json({ message: "Friend Removed From List" });
  } catch (error) {
    res.status(400).json({ message: 'No user with that ID' });
  }
};

