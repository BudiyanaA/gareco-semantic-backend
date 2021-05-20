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

            return res.status(200).json({
                success: true,
                status: 200,
                data: reviews,
                message: 'Data semua review berhasil didapatkan'
            });

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
