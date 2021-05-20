const ReviewRepo = require('../repos/ReviewRepo');
const ReviewFormatter = require('../utils/ReviewFormatter');

module.exports = {
    getReviews: async (req, res) => {
        try {
            let reviews = await ReviewRepo.getAllReviews(req.query);

            if (!reviews.bindings.length) {
                return res.status(200).json({
                    success: true,
                    status: 200,
                    data: [],
                    message: 'Data review tidak ditemukan'
                })
            }

            reviews = reviews.bindings.map((review) => ReviewFormatter(review));

            if (req.params.id) {
                let review = reviews.filter((review) => { return review.uri.substring(19) == req.params.id });
                
                return res.status(200).json({
                    success: true,
                    status: 200,
                    data: review[0],
                    message: review.length ? 'Data review berhasil didapatkan' : 'Data review tidak ditemukan'
                });

            } else {
                return res.status(200).json({
                    success: true,
                    status: 200,
                    data: reviews,
                    message: 'Data semua review berhasil didapatkan'
                });
            }
            
        } catch (err) {
            return res.status(200).json({
                success: false,
                status: 200,
                data: '',
                message: `Error: ${err.message}`
            })
        }
    }
}
