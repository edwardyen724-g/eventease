import { Stripe } from 'stripe';
import { env } from 'process';

const stripe = new Stripe(env.NEXT_PUBLIC_STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
});

export const createCheckoutSession = async (lineItems: { price: string; quantity: number }[]) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${env.NEXT_PUBLIC_BASE_URL}/cancel`,
    });

    return session;
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : String(err));
  }
};

export const verifyWebhook = (req: any) => {
  const sig = req.headers['stripe-signature'];
  
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    throw new Error(`Webhook Error: ${err instanceof Error ? err.message : String(err)}`);
  }

  return event;
};