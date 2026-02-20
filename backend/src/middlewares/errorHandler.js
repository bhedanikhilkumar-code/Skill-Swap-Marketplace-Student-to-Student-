import { fail } from '../utils/response.js';

export const errorHandler = (err, req, res, next) => {
  console.error(err);
  return fail(res, err.message || 'Internal server error', err.errors || null, err.status || 500);
};
