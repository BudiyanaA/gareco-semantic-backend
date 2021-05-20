const express = require('express');
const router = express.Router();
const { getReviews } = require('../controllers/ReviewController');

router.get('/', (req, res) => {
    res.status(200).json({
        status: 200,
        success: true,
        data: 'Gareco API is Already Running...'
    })
})

router.get('/reviews', getReviews)

module.exports = router;