import { fail } from '../utils/response.js';

export const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse({ body: req.body, params: req.params, query: req.query });
  if (!result.success) {
    return fail(res, 'Validation failed', result.error.flatten(), 422);
  }
  req.validated = result.data;
  return next();
};
