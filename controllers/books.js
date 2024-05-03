import { Book } from '../models/book.js'
import { Profile } from '../models/profile.js'
const openLibURL = "https://openlibrary.org/"

async function index(req, res) {
  try {
    const books = await Book.find({}).sort({title: 'asc'})
    res.json(books)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function create(req, res) {
  try {
    const book = await Book.find({OLID:req.body.OLID})
    if(!book.length){
      const newbook = await Book.create(req.body)    
      const apiResponse = await fetch(`${openLibURL}works/${newbook.OLID}.json`)
      const apiData = await apiResponse.json()
      apiData.description.value ? newbook.description = apiData.description.value : newbook.description = apiData.description
      newbook.save()
      res.status(201).json(newbook)
    }
    res.status(201).json(book[0])
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function show(req, res){
  try {
    // const apiResponse = await fetch(`${openLibURL}books/${req.params.bookId}.json`)

    // const apiData = await apiResponse.json()
    // res.json(apiData)

    const book = await Book.findById(req.params.bookId)
    .populate(['reviews.reviewer'])
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
    const book = await Book.findById(req.params.bookId).populate(['reviews.reviewer'])
    const review = book.reviews.id(req.params.reviewId)
    review.title = req.body.title
    review.content = req.body.content
    review.rating = req.body.rating
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
    book.readCount+=1
    await book.save()
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
    book.wishCount+=1
    await book.save()
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
    const apiResponse = await fetch(`${openLibURL}search.json?${req.body.category}=${req.body.searchStr.replaceAll(" ", "+")}&fields=key,title,author_name,cover_edition_key,first_publish_year,editions,editions.key,editions.title,editions.language&lang=eng`)

    const apiData = await apiResponse.json()
    res.json(apiData.docs)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function recentReleases(req, res){
  try {
    const books = await Book.find({}).sort({firstPublished:-1, title: 'asc'})
    .limit(10)
    res.json(books)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function mostRead(req, res){
  try {
    const books = await Book.find({}).sort({readCount: -1, title: 'asc' })
    .limit(10)
    res.json(books)
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
  deleteReview,
  addReadList,
  addWishList,
  search,
  recentReleases,
  mostRead,
}
