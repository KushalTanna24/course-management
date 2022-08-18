const express = require('express')
const router = express.Router()
const { Rating, validateRating } = require('../model/rating.model')
const {
  getAllRatings,
  getCourseRatings,
  addCourseRatings,
  updateCourseRatings,
  deleteCourseRatings,
} = require('../controller/rating.controller')

router.get('/', getAllRatings)

router.get('/:id', getCourseRatings)

router.post('/', addCourseRatings)

router.put('/:id', updateCourseRatings)

router.delete('/:id', deleteCourseRatings)

module.exports = router
