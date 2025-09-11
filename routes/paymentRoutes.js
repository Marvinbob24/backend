import { Router } from "express";
import axios from "axios";

const router = Router();

// Initialize payment
router.post("/pay", async (req, res) => {
  const { amount, email, orderId } = req.body;

  try {
    const response = await axios.post(
      "https://api.flutterwave.com/v3/payments",
      {
        tx_ref: orderId,             // Unique order reference
        amount,
        currency: "NGN",
        redirect_url: `${process.env.FRONTEND_URL}/payment-success`,
        customer: { email },
        payment_options: "card",
        meta: { orderId },
        customizations: {
          title: "FanGear Central",
          description: "Payment for your order",
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({ link: response.data.data.link });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ message: "Payment initialization failed" });
  }
});

// Verify payment after redirect
router.get("/verify/:tx_ref", async (req, res) => {
  const { tx_ref } = req.params;

  try {
    const response = await axios.get(
      `https://api.flutterwave.com/v3/transactions/verify_by_txref?tx_ref=${tx_ref}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
        },
      }
    );

    const data = response.data.data;
    if (data.status === "successful") {
      // Payment succeeded
      return res.json({ success: true, orderId: data.meta.orderId });
    } else {
      return res.json({ success: false });
    }
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ success: false, message: "Payment verification failed" });
  }
});

export default router;
