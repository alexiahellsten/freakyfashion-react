import express from "express";
const router = express.Router();
import db from "../../db/db.js";

// GET /api/products + api/products?q=
router.get("/", function (req, res, next) {
  const searchQuery = req.query.q; 

  let sql = `
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
    sql += " WHERE name LIKE ? OR description LIKE ?";
    params = [`%${searchQuery}%`, `%${searchQuery}%`];
  }

  try {
    const rows = db.prepare(sql).all(...params);
    res.json(rows);
  } catch (error) {
    next(error);
  }
});


router.get("/:slug", function (req, res, next) {
  const slug = req.params.slug;

  const singleProduct = `
    SELECT sku,
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
    WHERE slug = ?
  `;

  const slideshowProducts = `
    SELECT sku,
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
    WHERE slug != ?
    ORDER BY RANDOM()
    LIMIT 8
  `;

  try {
    const row = db.prepare(singleProduct).get(slug);
    const rows = db.prepare(slideshowProducts).all(slug);

    if (!row) {
      return res.status(404).send("Kunde inte hitta produkten");
    }

    res.json({
      product: row,
      slideshow: rows, 
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default router;