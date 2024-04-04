import { Book } from '../models/book.js'
import { Profile } from '../models/profile.js'
const openLibURL = "https://openlibrary.org/"

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
    console.log(`${openLibURL}books/${req.params.bookId}.json`)
    const apiResponse = await fetch(`${openLibURL}books/${req.params.bookId}.json`)

    const apiData = await apiResponse.json()
    res.json(apiData)

    // const book = await Book.findById(req.params.bookId)
    // .populate('reviews.reviewer')
    // res.status(201).json(book)
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

    const review = book.reviews[book.reviews.length - 1]
    const profile = await Profile.findById(req.user.profile)
    review.reviewer = profile
    await review.save()
    await book.save()
    
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

async function deleteReview(req, res){
  try {
    const book = await Book.findById(req.params.bookId)
    book.reviews.remove({_id: req.params.reviewId})
    await book.save()

    res.status(201).json(book)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function addReadList(req, res) {
  try {
    const profile = await Profile.findById(req.user.profile)
    const book = await Book.findById(req.params.bookId)

    profile.readList.push(book)
    await profile.save()
    res.status(201).json(profile)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function addWishList(req, res) {
  try {
    const profile = await Profile.findById(req.user.profile)
    const book = await Book.findById(req.params.bookId)

    profile.wishList.push(book)
    await profile.save()
    res.status(201).json(profile)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function search(req, res) {
  try {
    const apiResponse = await fetch(`${openLibURL}search.json?${req.body.category}=${req.body.searchStr.replaceAll(" ", "+")}&lang=eng`)

    const apiData = await apiResponse.json()
    res.json(apiData.docs)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

export { 
  index,  
  create,
  show,
  update,
  createReview,
  updateReview,
  deleteReview,
  addReadList,
  addWishList,
  search,
}
