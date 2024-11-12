import mongoose from "mongoose";

mongoose.connect('mongodb://localhost:27017/mylinkies');

export default mongoose.connection;