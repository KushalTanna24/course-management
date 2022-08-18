const { Rating, validateRating } = require('../model/rating.model')

const getAllRatings = async (req, res) => {
  const result = await Rating.find()
  if (!result || result.length === 0) {
    return res.status(404).send('No ratings found yet')
  }
  res.send(result)
}

const getCourseRatings = async (req, res) => {
  const result = await Rating.find({
    courseId: req.params.id,
  })
  if (!result) return res.status(404).send('Rating not found')
  res.send(result)
}

const addCourseRatings = async (req, res) => {
  const { error } = validateRating(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const exist = await Rating.findOne({
    courseId: req.body.courseId,
    userId: req.body.userId,
  })
  if (exist) return res.status(400).send('You have already rated this course')

  const rating = new Rating({
    courseId: req.body.courseId,
    userId: req.body.userId,
    rate: req.body.rate,
    comment: req.body.comment,
    createdAt: Date.now(),
  })
  const result = await rating.save()
  res.send(result)
}

const updateCourseRatings = async (req, res) => {
  const { error } = validateRating(req.body)
  if (error) return res.json({ message: error.details[0].message, status: 400 })

  const rating = await Rating.findByIdAndUpdate(
    req.params.id,
    {
      rate: req.body.rate,
      comment: req.body.comment,
      updatedAt: Date.now(),
    },
    { new: true }
  )
  if (!rating) return res.status(404).send('Rating not found')

  res.send(rating)
}

const deleteCourseRatings = async (req, res) => {
  const result = await Rating.findByIdAndRemove(req.params.id)
  if (!result) return res.status(404).send('Rating not found')
  res.send(result)
}

module.exports = {
  getAllRatings,
  getCourseRatings,
  addCourseRatings,
  updateCourseRatings,
  deleteCourseRatings,
}
