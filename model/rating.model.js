const mongoose = require('mongoose')
const Joi = require('joi')

const ratingSchema = new mongoose.Schema({
  courseId: { type: String, required: true },
  userId: { type: String, required: true },
  rate: { type: Number },
  comment: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
})

const validateRating = (rating) => {
  const schema = Joi.object({
    courseId: Joi.string().required(),
    userId: Joi.string().required(),
    rate: Joi.number().min(1).max(5),
    comment: Joi.string(),
  })

  return schema.validate(rating)
}
const Rating = mongoose.model('rating', ratingSchema)

exports.Rating = Rating
exports.validateRating = validateRating
