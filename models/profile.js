import mongoose from 'mongoose'

const Schema = mongoose.Schema

const profileSchema = new Schema({
  name: String,
  photo: String,
  readList: [{
    type: Schema.Types.ObjectId, 
    ref: 'Book'
  }],
  wishList: [{
    type: Schema.Types.ObjectId, 
    ref: 'Book'
  }],
  role: Number,
  following: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Profile'
  }]
},{
  timestamps: true,
})

const Profile = mongoose.model('Profile', profileSchema)

export { Profile }
