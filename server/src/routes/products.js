import express from "express";
const router = express.Router();
import db from "../../db/db.js";

// GET /api/products + api/products?q=
router.get("/", function (req, res, next) {
  const searchQuery = req.query.q;

  let products = `
    SELECT product.id,
           product.sku,
           product.name,
           product.price,
           product.brand,
           product.description,
           product.image,
           product.slug,
           product.registrationDate,
           product.publicationDate,
           product.isNew,
           product.isFavourite,
           category.name AS category
    FROM products product
    LEFT JOIN categories category ON category.id = product.category_id
  `;

  let params = [];

  if (searchQuery) {
    products += " WHERE product.name LIKE ? OR product.description LIKE ?";
    params = [`%${searchQuery}%`, `%${searchQuery}%`];
  }

  try {
    const rows = db.prepare(products).all(...params);
    res.json(rows);
  } catch (error) {
    next(error);
  }
});


router.get("/:slug", function (req, res, next) {
  const slug = req.params.slug;

  const singleProduct = `
    SELECT product.sku,
           product.name,
           product.price,
           product.brand,
           product.description,
           product.image,
           product.slug,
           product.registrationDate,
           product.publicationDate,
           product.isNew,
           product.isFavourite,
           category.name AS category
    FROM products product
    LEFT JOIN categories category ON category.id = product.category_id
    WHERE product.slug = ?
  `;

  const slideshowProducts = `
    SELECT product.sku,
           product.name,
           product.price,
           product.brand,
           product.description,
           product.image,
           product.slug,
           product.registrationDate,
           product.publicationDate,
           product.isNew,
           product.isFavourite,
           category.name AS category
    FROM products product
    LEFT JOIN categories category ON category.id = product.category_id
    WHERE product.slug != ?
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