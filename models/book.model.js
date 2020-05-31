import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let BookSchema = new Schema({

    name: {type: String, required: true, max: 100},
    taken: {type: String, required: false},
    author: {type: String, required: true, max: 100},
    description: String,
    imageURL: String
});

// Export the model
export const Book = mongoose.model('Book', BookSchema);

