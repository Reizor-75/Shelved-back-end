import mongoose from 'mongoose'

const Schema = mongoose.Schema

const reviewSchema = new Schema({
  reviewer: {
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
  OLID: {
    type: String,
    required: true
  },
  title: { 
    type: String,
    required: true
  },
  authors: [ {type: String, required: true} ],
  description: String,
  firstPublished: Date,
  coverPhoto: String,
  reviews: [reviewSchema],
  readCount: {
    type:Number,
    default: 0
  },
  wantCount: {
    type:Number,
    default: 0
  },
},{
  timestamps: true,
})

const Book = mongoose.model('Book', bookSchema)

export { Book }
