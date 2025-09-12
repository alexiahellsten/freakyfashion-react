import express from "express";
const router = express.Router();
import db from "../../../db/db.js";

// GET /api/user - Check authentication status
router.get("/", function (req, res, next) {
  try {
    //Sparar informationen om inloggning i sessionen
    res.json({
      //Sparar värdet som en boolean (sant/falskt) med !!
      isLoggedIn: !!req.session.userId,
      userId: req.session.userId,
      email: req.session.email,
      isAdmin: req.session.isAdmin
    });
  } catch (error) {
    next(error);
  }
});


// POST /login
router.post("/", (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = db.prepare("SELECT * FROM users WHERE email = ? AND password = ?").get(email, password);

    if (!user) {
      return res.status(401).json({ message: "Användaren finns inte" });
    }

    // Spara användaren i sessionen
    req.session.userId = user.id;
    req.session.email = user.email;
    req.session.isAdmin = user.isAdmin;

    res.json({ message: "Inloggningen lyckades", user: { id: user.id, email: user.email, isAdmin: user.isAdmin } });
    
    //TODO: Ta bort efter felsökning
    console.log("Inloggad användare:", user);
  } catch (err) {
    next(err);
  }
});

// Middleware för att kontrollera om användaren är inloggad
function requireLogin(req, res, next) {
  console.log("Session i requireLogin:", req.session);
  if (!req.session.userId) {
    return res.status(401).json({ message: "Obehörig användare" });
  }
  next();
}

// GET /status - Kontrollerar om användaren är inloggad
router.get("/status", (req, res) => {
  if (req.session && req.session.userId) {
    res.json({
      isLoggedIn: true,
      userId: req.session.userId,
      email: req.session.email
    });
  } else {
    res.json({ isLoggedIn: false });
  }
});


// Profil-route som endast går att komma åt som inloggad användare
router.get("/profile", requireLogin, (req, res) => {

  if (req.session.userId) {
    console.log("Välkommen tillbaka:", req.session.userId);
  } else {
    console.log("Användaren är inte inloggad");
  } 
  res.json({ message: "Välkommen tillbaka!", user: { id: req.session.userId, username: req.session.email } });
});

router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({ message: "Utloggning lyckades" });
  });
});

// Favorit-route som endast går att komma åt som inloggad användare
router.get("/favorites", requireLogin, (req, res) => {
  res.json({ message: "Mina favoriter", user: { id: req.session.userId, username: req.session.email } });
});

export default router;