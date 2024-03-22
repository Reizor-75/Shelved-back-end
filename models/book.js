import mongoose from 'mongoose'

const Schema = mongoose.Schema

const reviewSchema = new Schema({
  reviwer: {
    type: Schema.Types.ObjectId,
    ref: 'Profile'
  },
  title: String,
  content: String,
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 5
  }
})

const bookSchema = new Schema({
  title: { 
    type: String,
    required: true
  },
  author: [ {type: String, required: true} ],
  firstPublished: Date,
  genre: [ {type: String} ],
  coverPhoto: String,
  reviews: [reviewSchema],
},{
  timestamps: true,
})

const Book = mongoose.model('Book', bookSchema)

export { Book }
