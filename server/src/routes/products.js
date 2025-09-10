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


// GET /api/products/:id (numeric)
router.get("/:id(\\d+)", function (req, res) {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) {
    return res.status(400).json({ message: "Ogiltigt produkt-ID" });
  }

  const singleById = `
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
    WHERE product.id = ?
  `;

  try {
    const row = db.prepare(singleById).get(id);
    if (!row) {
      return res.status(404).json({ message: "Kunde inte hitta produkten" });
    }
    return res.json(row);
  } catch (error) {
    return res.status(500).json({ message: "Fel vid hämtning av produkt" });
  }
});

// GET /api/products/:slug (non-numeric)
router.get("/:slug", function (req, res, next) {
  const slug = req.params.slug;

  const singleProduct = `
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
    WHERE product.slug = ?
  `;

  const slideshowProducts = `
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

// GET /api/products/:id
router.get("/:id", function (req, res) {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) {
    return res.status(400).json({ message: "Ogiltigt produkt-ID" });
  }

  const singleById = `
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
    WHERE product.id = ?
  `;

  try {
    const row = db.prepare(singleById).get(id);
    if (!row) {
      return res.status(404).json({ message: "Kunde inte hitta produkten" });
    }
    return res.json(row);
  } catch (error) {
    return res.status(500).json({ message: "Fel vid hämtning av produkt" });
  }
});

export default router;