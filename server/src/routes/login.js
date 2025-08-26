import express from "express";
const router = express.Router();
import db from "../../db/db.js";

// GET /api/login
router.get("/", function (req, res, next) {

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

  try {
    const rows = db.prepare(favoriteProducts).all();
    res.json(rows);
  } catch (error) {
    next(error);
  }
});

export default router;