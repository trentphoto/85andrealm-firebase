import type { NextApiRequest, NextApiResponse } from 'next';
import { getProducts } from '../../lib/firebase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const products = await getProducts();
      res.status(200).json(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'An error occurred while fetching products.' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed. Use GET.' });
  }
}
