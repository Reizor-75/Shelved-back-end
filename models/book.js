import mongoose from 'mongoose'

const Schema = mongoose.Schema

const bookSchema = new Schema({
  title: { 
    type: String,
    required: true
  },
  author: [ {type: String, required: true} ],
  firstPublished: Date,
  genre: [ {type: String} ],
},{
  timestamps: true,
})

const Book = mongoose.model('Book', bookSchema)

export { Book }
