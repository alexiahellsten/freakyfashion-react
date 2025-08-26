import express from "express";
const router = express.Router();
import db from "../../db/db.js";

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

export default router;