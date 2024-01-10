import type { NextApiRequest, NextApiResponse } from 'next';
import { getPost } from '../../../lib/firebase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const postId = req.query.id; // get the post ID from the query parameters

  if (typeof postId !== 'string') {
    return res.status(400).json({ error: 'Invalid post ID.' });
  }

  if (req.method === 'GET') {
    try {
      const post = await getPost(postId);
      if (!post) {
        return res.status(404).json({ error: 'Post not found.' });
      }
      res.status(200).json(post);
    } catch (error) {
      console.error('Error fetching post:', error);
      res.status(500).json({ error: 'An error occurred while fetching the post.' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed. Use GET.' });
  }
}
