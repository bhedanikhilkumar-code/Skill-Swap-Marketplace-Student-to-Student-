import Review from '../models/Review.js';
import Swap from '../models/Swap.js';
import User from '../models/User.js';
import { success, fail } from '../utils/response.js';

export const createReview = async (req, res) => {
  const { swapId, revieweeId, rating, text } = req.body;
  const swap = await Swap.findById(swapId);
  if (!swap || swap.status !== 'COMPLETED') return fail(res, 'Swap not completed', null, 400);
  const review = await Review.create({ swapId, revieweeId, rating, text, reviewerId: req.user.id });
  const stats = await Review.aggregate([{ $match: { revieweeId: review.revieweeId } }, { $group: { _id: '$revieweeId', avg: { $avg: '$rating' }, count: { $sum: 1 } } }]);
  if (stats.length) await User.findByIdAndUpdate(revieweeId, { ratingAverage: stats[0].avg, totalSwaps: stats[0].count });
  return success(res, review, 'Review submitted', 201);
};

export const getUserReviews = async (req, res) => success(res, await Review.find({ revieweeId: req.params.userId }).populate('reviewerId', 'name avatarUrl'));
