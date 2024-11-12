import { Schema, model, Document, ObjectId } from 'mongoose';

interface Ithought extends Document {
    thoughtText: string;
    username: string;
    createdAt: Date;
    reactions: IReaction[];
}

interface IReaction extends Document {
    reactionId: ObjectId[];
    reactionBody: string;
    username: string;
    createdAt: Date;
}

// Reaction Schema
const reactionSchema = new Schema<IReaction>(
    {
        reactionId: { 
            type: Schema.Types.ObjectId, 
            default: () => new ObjectId() 
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
            get: (timestamp: any) => dateFormat(timestamp)
        }
    },
    {
        toJSON: {
            getters: true,
        },
        id: false
    },
);

// Create the dateFormat function
const dateFormat = (createdAt: Date): string => {
    return new Date(createdAt).toLocaleString();
}

// Create the virtual for the reactionCount
reactionSchema
    .virtual('reactionCount')
    .get(function(this: any) {
    return this.reactions.length;
});



// Thought Schema
const thoughtSchema = new Schema<Ithought>(
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
            get: (timestamp: any) => dateFormat(timestamp)
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

thoughtSchema
    .virtual('reactionCount')
    .get(function(this: any) {
    return this.reactions.length;
});
thoughtSchema.set('toJSON', { virtuals: true, });

const Thought = model('Thought', thoughtSchema);

export default  Thought;