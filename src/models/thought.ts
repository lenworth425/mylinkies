import { Schema, model, Document, ObjectId, Types } from 'mongoose';

// Define the Reaction interface
interface IReaction extends Document {
    reactionId: ObjectId; // Changed to a single ObjectId
    reactionBody: string;
    username: string;
    createdAt: Date;
}

// Reaction Schema
const reactionSchema = new Schema<IReaction>(
    {
        reactionId: { 
            type: Schema.Types.ObjectId, 
            default: () => new Types.ObjectId() 
        },
        reactionBody: { 
            type: String, 
            required: true,
            maxLength: 280 
        },
        username: { 
            type: String, 
            required: true 
        },
        createdAt: { 
            type: Date, 
            default: Date.now, 
        }
    },
    {
        toJSON: {
            getters: true,
        },
        id: false
    },
);

// Thought Schema
interface IThought extends Document {
    thoughtText: string;
    username: string;
    createdAt: Date;
    reactions: IReaction[];
}

const thoughtSchema = new Schema<IThought>(
    {
        thoughtText: { 
            type: String, 
            required: true,
            minLength: 1,
            maxLength: 280 
        },
        username: { 
            type: String, 
            required: true 
        },
        createdAt: { 
            type: Date, 
            default: Date.now, 
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false
    },
);

// Create the virtual for the reactionCount
thoughtSchema
    .virtual('reactionCount')
    .get(function(this: IThought) {
        return this.reactions.length;
    });

const Thought = model<IThought>('Thought', thoughtSchema);

export default Thought;