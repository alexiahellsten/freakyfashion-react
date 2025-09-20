import express from "express";
const router = express.Router();
import db from "../../db/db.js";

// GET /api/new
router.get("/", function (req, res, next) {
  const searchQuery = req.query.q;

  //Kalkylerar datum för idag och sju dagar tillbaka
  const today = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(today.getDate() - 7);

  //Formatterar datumen till YYYY-MM-DD
  const todayStr = today.toISOString().split("T")[0];
  const sevenDaysAgoStr = sevenDaysAgo.toISOString().split("T")[0];

  let newProductsQuery = `
    SELECT id, sku, name, price, brand, description, image, slug,
           registrationDate, publicationDate, isNew, isFavourite, category
    FROM products
    WHERE isNew = 1 
      AND DATE(publicationDate) >= ? 
      AND DATE(publicationDate) <= ?
  `;

  let params = [sevenDaysAgoStr, todayStr];

  if (searchQuery) {
    newProductsQuery += " AND (name LIKE ? OR description LIKE ?)";
    params.push(`%${searchQuery}%`, `%${searchQuery}%`);
  }

  // Ändrar placeringen av ORDER BY och LIMIT för att säkerställa korrekt sortering
  newProductsQuery += " ORDER BY publicationDate DESC, id DESC LIMIT 20";

  try {
    const rows = db.prepare(newProductsQuery).all(...params);
    res.json(rows);
  } catch (error) {
    console.error("Database error:", error);
    next(error);
  }
});

export default router;
