import express from "express";
import db from "../../db/db.js";
import generateSlug from "../../db/utilities/generate-slug.js";

const router = express.Router();

// GET /admin/products
router.get("/products", (req, res, next) => {
  try {
    const sql = `
      SELECT id, sku, name, price, brand, description, image, slug, registrationDate, isNew, isFavourite
      FROM products
    `;
    const rows = db.prepare(sql).all();
    res.json({ products: rows }); // Return JSON instead of rendering
  } catch (error) {
    next(error);
  }
});

// POST /admin/products/new (Create new product)
router.post("/products/new", (req, res) => {
  try {
    const slug = generateSlug(req.body.name);
    const registrationDate = new Date(req.body.registrationDate).toISOString().split('T')[0];
    const currentDate = new Date();
    const isNew = (currentDate - new Date(registrationDate)) / (1000 * 60 * 60 * 24) <= 7 ? 1 : 0;

    const product = {
      sku: String(req.body.sku),
      name: String(req.body.name),
      price: Number(req.body.price),
      brand: "Freaky",
      description: String(req.body.description),
      image: String(req.body.image),
      slug: String(slug),
      registrationDate: String(registrationDate),
      isNew: Number(isNew),
      isFavourite: 0
    };

    const sql = `
      INSERT INTO products (sku, name, price, brand, description, image, slug, registrationDate, isNew, isFavourite)
      VALUES (@sku, @name, @price, @brand, @description, @image, @slug, @registrationDate, @isNew, @isFavourite);
    `;
    db.prepare(sql).run(product);

    console.log("New product registered:", product);
    res.status(201).json({ message: "Product added", product });

  } catch (error) {
    console.error("Error adding product:", error.message);
    res.status(500).json({ error: "Failed to add product" });
  }
});

// DELETE /admin/products/:slug
router.delete("/products/:slug", (req, res) => {
  try {
    const sql = `DELETE FROM products WHERE slug = ?`;
    db.prepare(sql).run(req.params.slug);
    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Failed to delete product" });
  }
});

// PUT /admin/products/:slug (Update product)
router.put("/products/:slug", (req, res) => {
  try {
    const { sku, name, price, brand, description, image, registrationDate, isFavourite } = req.body;
    const isNew = (new Date() - new Date(registrationDate)) / (1000 * 60 * 60 * 24) <= 7 ? 1 : 0;

    const sql = `
      UPDATE products
      SET sku = ?, name = ?, price = ?, brand = ?, description = ?, image = ?, registrationDate = ?, isFavourite = ?, isNew = ?
      WHERE slug = ?;
    `;
    db.prepare(sql).run(sku, name, price, brand, description, image, registrationDate, isFavourite, isNew, req.params.slug);
    
    res.json({ message: "Product updated" });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Failed to update product" });
  }
});

export default router;
