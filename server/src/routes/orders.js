import express from "express";
const router = express.Router();
import db from "../../db/db.js";

// POST /api/orders
router.post("/", (req, res) => {
  try {
    const { orderItems } = req.body || {};

    // Använder inloggat userId, annars används en gästanvändare
    let userId = req.session?.userId;
    const guestEmail = "guest@freakyfashion.se";

    if (!userId) {
      const existingGuest = db
        .prepare("SELECT id FROM users WHERE email = ?")
        .get(guestEmail);
      if (existingGuest) {
        userId = existingGuest.id;
      } else {
        const result = db
          .prepare("INSERT INTO users (email, password) VALUES (?, ?)")
          .run(guestEmail, "guest");
        userId = result.lastInsertRowid;
      }
    }

    if (!orderItems || orderItems.length === 0) {
      return res
        .status(400)
        .json({ message: "Inga orderrader skickades till databasen" });
    }

    const order = db.prepare(
      "INSERT INTO orders (user_id, product_id, quantity) VALUES (?, ?, ?)"
    );

    orderItems.forEach((index) => {
      const productId = Number(index.productId);
      const quantity = Math.max(1, Number(index.quantity) || 1);
      order.run(userId, productId, quantity);
    });

    return res.status(201).json({ success: true, count: orderItems.length });
  } catch (error) {
    console.error("Fel vid skapande av order:", error);
    return res.status(500).json({ message: "Kunde inte skapa order" });
  }
});

export default router;
