import express from "express";
const router = express.Router();
import db from "../../db/db.js";

// Hämtar produkter baserat på kategorins slug
function getProductsByCategorySlug(slug) {
  return db.prepare(`
    SELECT product.*
    FROM products product
    JOIN categories category ON category.id = product.category_id
    WHERE LOWER(category.slug) = LOWER(?)
  `).all(slug);
}

// GET /api/categories/clothing
router.get("/clothing", (req, res) => {
  try {
    const products = getProductsByCategorySlug("klader");
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Kunde inte hämta kläder" });
  }
});

// GET /api/categories/accessories
router.get("/accessories", (req, res) => {
  try {
    const products = getProductsByCategorySlug("accessoarer");
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Kunde inte hämta accessoarer" });
  }
});

// GET /api/categories/bags
router.get("/bags", (req, res) => {
  try {
    const products = getProductsByCategorySlug("vaskor");
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Kunde inte hämta väskor" });
  }
});

export default router;