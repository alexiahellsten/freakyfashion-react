import express from "express";
const router = express.Router();
import db from "../../../db/db.js";

// POST /register - Skapa en ny användare
router.post("/", (req, res, next) => {
  const { email, password } = req.body;

  try {
    const existingUser = db
      .prepare("SELECT * FROM users WHERE email = ?")
      .get(email);
    if (existingUser) {
      return res.status(400).json({
        message: "Användaren finns redan",
      });
    }

    const result = db
      .prepare("INSERT INTO users (email, password) VALUES (?, ?)")
      .run(email, password);
    const newUser = db
      .prepare("SELECT * FROM users WHERE id = ?")
      .get(result.lastInsertRowid);

    console.log("Hämtade ny användare:", newUser);

    // Spara den nya användaren i sessionen så att den kommer ihåg inloggningen
    req.session.userId = newUser.id;
    req.session.email = newUser.email;
    req.session.isAdmin = newUser.isAdmin;

    res.status(201).json({
      message: "Registreringen lyckades",
      user: {
        id: newUser.id,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
      },
    });

    console.log("Registrerar användare:", email);
    console.log("Användare skapad:", newUser);
  } catch (err) {
    next(err);
  }
});

export default router;
