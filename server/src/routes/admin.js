import express from "express";
import db from "../../db/db.js";
import generateSlug from "../../db/utilities/generate-slug.js";
import multer from "multer";
import path from "path";

const router = express.Router();

// Använder multer för att hantera filuppladdningar
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "public/images/products"));
  },
  filename: function (req, file, cb) {
    // Använder Date.now() för att skapa ett unikt filnamn
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});
const upload = multer({ storage });

// GET /admin
router.get("/", (req, res, next) => {
  try {
    const sql = `
       SELECT 
       id,
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
      category_id
      FROM products
    `;
    const rows = db.prepare(sql).all();
    res.json({ products: rows });
  } catch (error) {
    next(error);
  }
});

// GET /admin/products
router.get("/products", (req, res, next) => {
  try {
    const sql = `
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
     category_id
      FROM products
    `;
    const rows = db.prepare(sql).all();
    res.json({ products: rows });
  } catch (error) {
    next(error);
  }
});

// POST /admin/products/new
router.post("/products/new", upload.single("image"), (req, res) => {
  try {
    const slug = generateSlug(req.body.name);
    const registrationDate = new Date().toISOString().split("T")[0];
    const publicationDate = req.body.publicationDate || registrationDate;
    const isNew = 1;

    // Hämtar bildens URL om en fil har laddats upp
    let imageUrl = "";
    if (req.file) {
      imageUrl = `/images/products/${req.file.filename}`;
    }

    const product = {
      sku: String(req.body.sku),
      name: String(req.body.name),
      price: Number(req.body.price),
      brand: "Freaky",
      description: String(req.body.description),
      image: imageUrl,
      slug: String(slug),
      registrationDate: String(registrationDate),
      publicationDate: String(publicationDate),
      isNew: Number(isNew),
      isFavourite: 0,
      category_id: Number(req.body.category_id),
    };

    const sql = `
      INSERT INTO products (
        sku, name, price, brand, description, image, slug, 
        registrationDate, publicationDate, isNew, isFavourite, category_id
      )
      VALUES (
        @sku, @name, @price, @brand, @description, @image, @slug, 
        @registrationDate, @publicationDate, @isNew, @isFavourite, @category_id
      );
    `;
    db.prepare(sql).run(product);

    console.log("Ny produkt registrerad:", product);
    res.status(201).json({ message: "Produkt tillagd", product });
  } catch (error) {
    console.error("Fel vid registrering av produkt:", error.message);
    res.status(500).json({ error: "Kunde inte lägga till produkten" });
  }
});

// DELETE /admin/products/:slug
router.delete("/products/:slug", (req, res) => {
  try {
    const sql = `DELETE FROM products WHERE slug = ?`;
    db.prepare(sql).run(req.params.slug);
    res.status(200).json({ message: "Produkt raderad" });
  } catch (error) {
    console.error("Fel vid radering av produkt:", error);
    res.status(500).json({ error: "Kunde inte radera produkten" });
  }
});

export default router;
