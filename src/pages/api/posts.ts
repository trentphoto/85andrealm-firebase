import type { NextApiRequest, NextApiResponse } from 'next';
import { getPosts } from '../../lib/firebase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const posts = await getPosts();
      res.status(200).json(posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).json({ error: 'An error occurred while fetching posts.' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed. Use GET.' });
  }
}
