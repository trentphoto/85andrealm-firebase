import type { NextApiRequest, NextApiResponse } from 'next';
import { getTestimonials } from '../../lib/firebase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const testimonials = await getTestimonials();
      res.status(200).json(testimonials);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      res.status(500).json({ error: 'An error occurred while fetching testimonials.' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed. Use GET.' });
  }
}
