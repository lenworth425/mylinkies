import { Schema, model, Document, ObjectId } from 'mongoose';

interface IUser extends Document {
  _id: ObjectId;
  username: string;
  email: string;
  thoughts: ObjectId[];
  friends: ObjectId[];
}

const userSchema = new Schema<IUser>(
    {
        username: { 
            type: String, 
            required: true,
            unique: true,
            trim: true 
        },
        email: { 
            type: String, 
            required: true,
            unique: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid e-mail address'] 
        },
        thoughts: [
            { 
                type: Schema.Types.ObjectId, 
                ref: 'Thought' 
            }
        ],
        friends: [
            { 
                type: Schema.Types.ObjectId, 
                ref: 'User' 
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false
    }
);

userSchema
    .virtual('friendCount')
    .get(function(this: any) {
    return this.friends.length;
});


const User = model('User', userSchema);

export default User;