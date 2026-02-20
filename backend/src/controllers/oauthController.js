import User from '../models/User.js';
import { env } from '../config/env.js';
import { success } from '../utils/response.js';

export const githubStart = async (req, res) => {
  const redirectUri = encodeURIComponent(`${env.apiBaseUrl || 'http://localhost:4000'}/api/oauth/github/callback`);
  const clientId = env.githubClientId || 'GITHUB_CLIENT_ID';
  return res.redirect(`https://github.com/login/oauth/authorize?client_id=${clientId}&scope=read:user&redirect_uri=${redirectUri}&state=${req.user.id}`);
};

export const githubCallback = async (req, res) => {
  const userId = req.query.state;
  const username = req.query.mockUsername || 'github-dev-user';
  await User.findByIdAndUpdate(userId, {
    githubUsername: username,
    githubLinkedAt: new Date(),
    githubSummary: { publicRepos: 12, followers: 34, updatedAt: new Date() }
  });
  return success(res, { githubUsername: username }, 'GitHub linked (dev mock)');
};
