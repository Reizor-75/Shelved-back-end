import { Book } from '../models/book.js'
import { Profile } from '../models/profile.js'

async function index(req, res) {
  try {
    const books = await Book.find({})
    res.json(books)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function create(req, res) {
  try {
    const book = await Book.create(req.body)
    res.status(201).json(book)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function show(req, res){
  try {
    const book = await Book.findById(req.params.bookId)
    .populate('reviews.reviwer')
    res.status(201).json(book)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function update(req, res){
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.bookId,
      req.body,      
      { new: true }
    )
    res.status(201).json(book)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function createReview(req, res){
  try {
    const book = await Book.findById(req.params.bookId)
    book.reviews.push(req.body)
    await book.save()

    const review = book.reviews[book.reviews.length - 1]
    const profile = await Profile.findById(req.user.profile)
    review.reviwer = profile

    res.status(201).json(book)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function updateReview(req, res){
  try {
    const book = await Book.findById(req.params.bookId)
    const review = book.reviews.id(req.params.reviewId)
    review.title = req.body.title
    review.content = req.body.content
    review.rating = req.body.rating
    await review.save()
    await book.save()

    res.status(201).json(book)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

export { 
  index,  
  create,
  show,
  update,
  createReview,
  updateReview,
}
