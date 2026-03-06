import { NextApiRequest, NextApiResponse } from 'next';
import { initializeApp, authentication } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
initializeApp();

interface AuthedRequest extends NextApiRequest {
  user?: { uid: string };
}

const rateLimitMap = new Map<string, { count: number; lastRequest: number }>();

const rateLimit = (req: AuthedRequest) => {
  const key = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const currentTime = Date.now();
  
  if (!rateLimitMap.has(key)) {
    rateLimitMap.set(key, { count: 1, lastRequest: currentTime });
    return true;
  }

  const { count, lastRequest } = rateLimitMap.get(key)!;
  const timeElapsed = currentTime - lastRequest;

  if (timeElapsed > 60000) {
    rateLimitMap.set(key, { count: 1, lastRequest: currentTime });
    return true;
  }

  if (count < 5) {
    rateLimitMap.set(key, { count: count + 1, lastRequest });
    return true;
  }

  return false;
};

export default async function handler(req: AuthedRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  if (!rateLimit(req)) {
    return res.status(429).json({ message: 'Too Many Requests' });
  }

  try {
    const { amount, currency, token } = req.body;

    if (!amount || !currency || !token) {
      return res.status(400).json({ message: 'Missing parameters' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method: token,
      confirmation_method: 'manual',
      confirm: true,
    });

    return res.status(200).json(paymentIntent);
  } catch (err) {
    return res.status(500).json({ message: err instanceof Error ? err.message : String(err) });
  }
}