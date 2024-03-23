import { Profile } from '../models/profile.js'
import { v2 as cloudinary } from 'cloudinary'
import { Book } from '../models/book.js'

async function index(req, res) {
  try {
    const profiles = await Profile.find({})
    res.json(profiles)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function addPhoto(req, res) {
  try {
    const imageFile = req.files.photo.path
    const profile = await Profile.findById(req.params.id)

    const image = await cloudinary.uploader.upload(
      imageFile, 
      { tags: `${req.user.email}` }
    )
    profile.photo = image.url
    
    await profile.save()
    res.status(201).json(profile.photo)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function show(req, res){
  try {
    const profile = await Profile.findById(req.user.profile)
      .populate('readList')
    res.status(201).json(profile)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function update(req, res){
  try {
    const profile = await Profile.findByIdAndUpdate(
      req.user.profile,
      req.body,      
      { new: true }
    ).populate('readList')
    res.status(201).json(profile)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function deleteBookReadList(req, res){
  try {
    const profile = await Profile.findById(req.user.profile)
    profile.readList.remove({_id: req.params.bookId})
    await profile.save()
    res.status(201).json(profile)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function deleteBookWishList(req, res){
  try {
    const profile = await Profile.findById(req.user.profile)
    profile.wishList.remove({_id: req.params.bookId})
    await profile.save()
    res.status(201).json(profile)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function moveBook(req, res){
  try {
    const profile = await Profile.findById(req.user.profile)
    const book = await Book.findById(req.params.bookId)
    profile.wishList.remove({_id: req.params.bookId})
    profile.readList.push(book)
    await profile.save()
    res.status(201).json(profile)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function addToFollowing(req, res){
  try {
    const profile = await Profile.findById(req.user.profile)
    const newFollowing = await Profile.findById(req.params.userId)

    profile.following.push(newFollowing)
    await profile.save()
    res.status(201).json(profile)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function removeFromFollowing(req, res){
  try {
    const profile = await Profile.findById(req.user.profile)
    profile.following.remove({_id:req.params.userId})
    await profile.save()
    res.status(201).json(profile)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

export { 
  index, 
  addPhoto, 
  show,
  update,
  deleteBookReadList,
  deleteBookWishList,
  moveBook,
  addToFollowing,
  removeFromFollowing,
}
