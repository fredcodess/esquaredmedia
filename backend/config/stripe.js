import express from "express";
import dotenv from "dotenv";
import stripePackage from "stripe";

dotenv.config();
const router = express.Router();
const stripe = stripePackage(process.env.STRIPE_SECRET_KEY);

router.post("/create-checkout-session", async (req, res) => {
  try {
    const { deposit, email } = req.body;

    if (!deposit || deposit <= 0) {
      return res.status(400).json({ error: "Invalid deposit amount" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: "Event Booking Deposit" },
            unit_amount: Math.round(deposit * 100), // Convert dollars to cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
      customer_email: email,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Error creating Stripe checkout session:", error);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
});

export default router;
