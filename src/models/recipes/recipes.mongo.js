const mongoose = require('mongoose');

const mongooseSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    ingredients: {
        type: [ String ],
        required: true,
    },
    steps: {
        type: [ String ],
        required: true,
      },
    description: String,
    id: {
        type: Number,
        require: true,
    }
})

mongooseSchema.pre('save', async function() {

    console.log('is it workinf?')
    try {
        const user = await mongoose.model('User').findByIdAndUpdate(
            this.author,
            { $push: { recipes: this._id } },
            { new: true }
        );
    } catch (err) {
        console.error(err);
    }
})

module.exports = mongoose.model('Recipe', mongooseSchema);