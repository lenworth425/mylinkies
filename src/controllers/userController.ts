import { User, Thoughts } from "../models/index.js";
import { Request, Response } from "express";


export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find();
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
    const user = await User.findOne({_id: req.params.id});
    if (user) {
      user.friends.push(req.params.friendId as any);
      if (user) {
        await user.save();
        res.json({ message: "Friend added" });
        
      }
      await user.save();
    } else {
      res.status(404).json({ message: 'No user with that ID' });
    }
    return res.json({ message: "Friend added" });
  } catch (error) {
    return res.status(400).json({ message: 'No user with that ID' });
  }
};

export const deleteFriend = async (req: Request, res: Response) => {
  try {
    const user = await User.findOneAndDelete({_id: req.params.id});

    if (!user) {
      return res.status(404).json({ message: "Friend not found" });
    }
    await Thoughts.deleteMany({ _id: { $in: user.friends } });
    return res.json({ message: "Friend Removed From List" });
  } catch (error) {
    return res.status(400).json({ message: 'No user with that ID' });
  }
};

