import express from "express";
const router = express.Router();
import db from "../../db/db.js";

// GET /login
router.get("/", function (req, res, next) {
  const searchQuery = req.query.q; 

  let products = `
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
    products += " WHERE name LIKE ? OR description LIKE ?";
    params = [`%${searchQuery}%`, `%${searchQuery}%`];
  }

  try {
    const rows = db.prepare(products).all(...params);
    res.json(rows);
  } catch (error) {
    next(error);
  }
});


// POST /login
router.post("/login", (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = db.prepare("SELECT * FROM users WHERE email = ? AND password = ?").get(email, password);

    if (!user) {
      return res.status(401).json({ message: "Användaren finns inte" });
    }

    // Spara användaren i sessionen
    req.session.userId = user.id;
    req.session.email = user.email;

    res.json({ message: "Inloggningen lyckades", user: { id: user.id, email: user.email } });
  } catch (err) {
    next(err);
  }
});

// Middleware för att kontrollera sessionen
function requireLogin(req, res, next) {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Obehörig" });
  }
  next();
}

// Profil-route som endast går att komma åt som inloggad användare
router.get("/profile", requireLogin, (req, res) => {
  res.json({ message: "Välkommen tillbaka!", user: { id: req.session.userId, username: req.session.email } });
});

// Profil-route som endast går att komma åt som inloggad användare
router.get("/favorites", requireLogin, (req, res) => {
  res.json({ message: "Mina favoriter", user: { id: req.session.userId, username: req.session.email } });
});

export default router;