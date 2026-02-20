import SkillBundle from '../models/SkillBundle.js';
import { fail, success } from '../utils/response.js';

export const createBundle = async (req, res) => {
  const bundle = await SkillBundle.create({ ...req.body, createdBy: req.user.id });
  return success(res, bundle, 'Bundle created', 201);
};

export const listBundles = async (req, res) => {
  const { search = '', page = 1, limit = 20 } = req.query;
  const items = await SkillBundle.find({ name: { $regex: search, $options: 'i' }, isPublic: true })
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));
  return success(res, { items, page: Number(page), limit: Number(limit) });
};

export const getBundle = async (req, res) => {
  const bundle = await SkillBundle.findById(req.params.id);
  if (!bundle) return fail(res, 'Bundle not found', null, 404);
  return success(res, bundle);
};
