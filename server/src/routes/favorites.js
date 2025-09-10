import express from "express";
const router = express.Router();
import db from "../../db/db.js";

// Middleware för att kontrollera att användaren är inloggad
function requireLogin(req, res, next) {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Obehörig användare" });
  }
  next();
}

// GET /api/favorites
router.get("/", requireLogin, (req, res) => {
  const userId = req.session.userId;
  
  try {
    const rows = db.prepare(`
      SELECT product.*
      FROM favorites favorite
      JOIN products product ON product.id = favorite.product_id
      WHERE favorite.user_id = ?
    `).all(userId);
    res.json(rows);

  } catch (error) {
    res.status(500).json({ message: "Kunde inte hämta favoriter" });
  }
});

// POST /api/favorites
router.post("/", requireLogin, (req, res, next) => {
  const { productId } = req.body;
  const userId = req.session.userId;

  if (!productId) {
    return res.status(400).json({ message: "productId krävs" });
  }

  try {
    db.prepare(
      "INSERT INTO favorites (user_id, product_id) VALUES (?, ?)"
    ).run(userId, productId);

    res.json({ success: true, message: "Favorit sparad" });
  } catch (error) {
    // Hantera om favoriten redan finns
    if (error.code) {
      return res.status(409).json({ message: "Produkten är redan favorit" });
    }
    next(error);
  }
});

// DELETE /api/favorites/:productId
router.delete("/:productId", requireLogin, (req, res) => {
  const userId = req.session.userId;
  const productId = req.params.productId;

  try {
    db.prepare(
      "DELETE FROM favorites WHERE user_id = ? AND product_id = ?"
    ).run(userId, productId);

    res.json({ success: true, message: "Favorit borttagen" });
  } catch (error) {
    res.status(500).json({ message: "Fel vid borttagning av favorit" });
  }
});



export default router;