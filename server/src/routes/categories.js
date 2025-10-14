import express from "express";
const router = express.Router();
import db from "../../db/db.js";

router.get("/", (req, res) => {
  const categories = db.prepare("SELECT id, slug FROM categories").all();
  res.json(categories);
});

// GET /api/categories/:slug
router.get("/:slug", (req, res) => {
  const { slug } = req.params;

  try {
    // Hämtar category_id baserat på slug
    const category = db
      .prepare("SELECT id FROM categories WHERE slug = ?")
      .get(slug);
    if (!category) {
      return res.status(404).json({ message: "Kategori hittades inte" });
    }
    // Hämtar alla produkter som matchar category_id
    const products = db
      .prepare("SELECT * FROM products WHERE category_id = ?")
      .all(category.id);
    res.json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Fel vid hämtning av produkter för kategori" });
  }
});

export default router;
