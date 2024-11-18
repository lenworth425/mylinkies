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
      const user = await User.findOne({ _id: req.params.userId});
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

export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findOneAndUpdate({ _id: req.params.userId }, req.body,
      { new: true });
    if (user) {
      res.json({ message: "User updated" });
    }
  } catch (error) {
    res.status(400).json({ message: 'No user with that ID' });
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.userId });
    if (!user) {
      return res.status(404).json({ message: 'No user with that ID' });
    }
    await Thoughts.deleteMany({ userId: req.params.userId });
    await User.findOneAndDelete({ _id: req.params.userId });
    return res.json({ message: "User and associated thoughts deleted" });
    
  } catch (error) {
    return res.status(400).json({ message: 'No user with that ID' });
  }
}
  
export const addFriend = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({_id: req.params.userId});
    if (user) {
      user.friends.push(req.params.friendId as any);
      await user.save();
      return res.json({ message: "Friend added" });
    } else {
      return res.status(404).json({ message: 'Error adding friend!' });
    }
  } catch (error) {
    return res.status(400).json({ message: 'No user with that ID' });
  }
};

export const deleteFriend = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, {$pull: {friends: req.params.friendId}}, {new: true});
    if (user) {
      user.friends.filter(friendId => friendId.toString() !== req.params.friendId);
      await user.save();
      return res.json({ message: "Friend Removed From Friends' List" });
    } else {
      return res.status(404).json({ message: 'No user with that ID' });
    }
  } catch (error) {
    return res.status(400).json({ message: 'No user with that ID' });
  }
};

