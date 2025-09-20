import express from "express";
const router = express.Router();
import db from "../../db/db.js";

// Hämtar inloggad användare eller en gästanvändare
function getUserId(req) {
  const guestEmail = "guest@freakyfashion.se";

  if (req.session && req.session.userId) {
    return req.session.userId;
  }

  const existingGuest = db
    .prepare("SELECT id FROM users WHERE email = ?")
    .get(guestEmail);

  if (existingGuest) return existingGuest.id;
  const result = db
    .prepare("INSERT INTO users (email, password) VALUES (?, ?)")
    .run(guestEmail, "guest");
  return result.lastInsertRowid;
}

// GET /api/basket
router.get("/", (req, res) => {
  const userId = getUserId(req);

  try {
    const rows = db
      .prepare(
        `
      SELECT 
        basket.id as basket_id,
        basket.quantity,
        basket.created_at,
        basket.updated_at,
        product.id as product_id,
        product.name,
        product.price,
        product.brand,
        product.image,
        product.slug
      FROM basket basket
      JOIN products product ON product.id = basket.product_id
      WHERE basket.user_id = ?
      ORDER BY basket.created_at DESC
    `
      )
      .all(userId);

    res.json(rows);
  } catch (error) {
    console.error("Error fetching basket:", error);
    res.status(500).json({ message: "Kunde inte hämta varukorg" });
  }
});

// POST /api/basket
router.post("/", (req, res) => {
  const { productId, quantity = 1 } = req.body;
  const userId = getUserId(req);

  if (!productId) {
    return res.status(400).json({ message: "productId krävs" });
  }

  if (quantity < 1) {
    return res.status(400).json({ message: "Antal måste vara minst 1" });
  }

  try {
    // Kontrollerar att produkten existerar
    const product = db
      .prepare("SELECT id FROM products WHERE id = ?")
      .get(productId);
    if (!product) {
      return res.status(404).json({ message: "Produkt hittades inte" });
    }

    // Kontrollerar om produkten redan är tillagd i varukorgen
    const existingItem = db
      .prepare(
        "SELECT id, quantity FROM basket WHERE user_id = ? AND product_id = ?"
      )
      .get(userId, productId);

    if (existingItem) {
      // Om produkten redan existerar i varukorgen - uppdatera kvaniteten
      const newQuantity = existingItem.quantity + quantity;
      db.prepare(
        "UPDATE basket SET quantity = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?"
      ).run(newQuantity, existingItem.id);

      res.json({
        success: true,
        message: "Antal uppdaterat i varukorg",
        action: "updated",
        quantity: newQuantity,
      });
    } else {
      // Lägg till produkten i varukorgen
      const result = db
        .prepare(
          "INSERT INTO basket (user_id, product_id, quantity) VALUES (?, ?, ?)"
        )
        .run(userId, productId, quantity);

      res.json({
        success: true,
        message: "Produkt tillagd i varukorg",
        action: "added",
        basketId: result.lastInsertRowid,
      });
    }
  } catch (error) {
    console.error("Fel vid tillägg i varukorgen:", error);
    res.status(500).json({ message: "Fel vid tillägg i varukorg" });
  }
});

// PUT /api/basket/:basketId - Uppdatera kvantiteten av produkten som finns i varukorgen
router.put("/:basketId", (req, res) => {
  const { basketId } = req.params;
  const { quantity } = req.body;
  const userId = getUserId(req);

  if (!quantity || quantity < 1) {
    return res.status(400).json({ message: "Antal måste vara minst 1" });
  }

  try {
    const result = db
      .prepare(
        "UPDATE basket SET quantity = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?"
      )
      .run(quantity, basketId, userId);

    if (result.changes === 0) {
      return res
        .status(404)
        .json({ message: "Varukorgsprodukt hittades inte" });
    }

    res.json({
      success: true,
      message: "Antal uppdaterat",
      quantity: quantity,
    });
  } catch (error) {
    console.error("Error updating basket item:", error);
    res.status(500).json({ message: "Fel vid uppdatering av varukorg" });
  }
});

// DELETE /api/basket/:basketId - Radera från varukorgen
router.delete("/:basketId", (req, res) => {
  const { basketId } = req.params;
  const userId = getUserId(req);

  try {
    const result = db
      .prepare("DELETE FROM basket WHERE id = ? AND user_id = ?")
      .run(basketId, userId);

    if (result.changes === 0) {
      return res
        .status(404)
        .json({ message: "Varukorgsprodukt hittades inte" });
    }

    res.json({ success: true, message: "Produkt borttagen från varukorg" });
  } catch (error) {
    console.error("Error removing from basket:", error);
    res.status(500).json({ message: "Fel vid borttagning från varukorg" });
  }
});

// DELETE /api/basket - Töm hela varukorgen
router.delete("/", (req, res) => {
  const userId = getUserId(req);

  try {
    db.prepare("DELETE FROM basket WHERE user_id = ?").run(userId);
    res.json({ success: true, message: "Varukorg raderad" });
  } catch (error) {
    console.error("Error clearing basket:", error);
    res.status(500).json({ message: "Fel vid radering av varukorg" });
  }
});

export default router;
