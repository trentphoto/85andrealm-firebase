import type { NextApiRequest, NextApiResponse } from 'next';
import { getProduct } from '../../../lib/firebase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id; // get the product ID from the query parameters

  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid product ID.' });
  }

  if (req.method === 'GET') {
    try {
      const product = await getProduct(id);
      if (!product) {
        return res.status(404).json({ error: 'Product not found.' });
      }
      res.status(200).json(product);
    } catch (error) {
      console.error('Error fetching product:', error);
      res.status(500).json({ error: 'An error occurred while fetching the product.' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed. Use GET.' });
  }
}
