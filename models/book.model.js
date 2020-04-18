import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let BookSchema = new Schema({

    name: {type: String, required: true, max: 100},
    taken: {type: Boolean, required: true}
});


// Export the model
export const Book = mongoose.model('Book', BookSchema);

