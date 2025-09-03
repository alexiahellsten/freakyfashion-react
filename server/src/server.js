import "dotenv/config";
import express from "express";
import session from "express-session";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname, join } from "path"; 

import productsRouter from "./routes/products.js";
import searchRouter from "./routes/search.js";
import adminRouter from "./routes/admin.js";
import favoritesRouter from "./routes/favorites.js";
import loginRouter from "./routes/login.js";
import newProductsRouter from "./routes/new-products.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const port = 8000;
const sessionSecret = process.env.SESSION_SECRET

const app = express();
app.use(cors());
app.use(express.json()); 
app.use(express.static(join(__dirname, 'public')));

app.use("/api/products", productsRouter);
app.use("/api/search", searchRouter);
app.use("/admin", adminRouter);
app.use("/api/favorites", favoritesRouter);
app.use("/api/login", loginRouter);
app.use("/api/new", newProductsRouter);

app.use(
  session({
    secret: sessionSecret, 
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV,
      maxAge: 1000 * 60 * 60, // Sätter cookie till maxlängd 1 timme
    },
  })
);

app.get("/", (req, res) => {
  res.send("Välkommen till Freaky Fashions API! Tillgängliga sökvägar: /api/products, /api/search, /admin, /favorites, /new");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

app.listen(port, () => {
  console.log(`Application running on port ${port}`);
});
