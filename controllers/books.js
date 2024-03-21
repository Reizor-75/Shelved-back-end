import { Book } from '../models/book.js'

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

export { 
  index,  
  create,
}
