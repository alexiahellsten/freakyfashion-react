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


// GET /api/favorites + api/favorites?q=
router.get("/", function (req, res, next) {
  const searchQuery = req.query.q; 

  let favoriteProducts = `
    SELECT id,
           sku,
           name,
           price,
           brand,
           description,
           image,
           slug,
           registrationDate,
           publicationDate,
           isNew,
           isFavourite, 
           category
    FROM products
    ORDER BY RANDOM()
    LIMIT 8
  `;

  let params = [];

  if (searchQuery) {
    favoriteProducts += " WHERE name LIKE ? OR description LIKE ?";
    params = [`%${searchQuery}%`, `%${searchQuery}%`];
  }

  try {
    const rows = db.prepare(favoriteProducts).all(...params);
    res.json(rows);
  } catch (error) {
    next(error);
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
    if (error.code === "SQLITE_CONSTRAINT") {
      return res.status(409).json({ message: "Produkten är redan favorit" });
    }
    next(error);
  }
});

export default router;