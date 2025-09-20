import path from "path";
import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, "../../.env") });

import productsRouter from "./routes/products.js";
import searchRouter from "./routes/search.js";
import adminRouter from "./routes/admin.js";
import favoritesRouter from "./routes/favorites.js";
import basketRouter from "./routes/basket.js";
import userRouter from "./routes/user/existing-user.js";
import registerRouter from "./routes/user/register-user.js";
import newProductsRouter from "./routes/new-products.js";
import ordersRouter from "./routes/orders.js";
import categoriesRouter from "./routes/categories.js";

const port = process.env.PORT || 8000;

const app = express();

//Konfiguerar CORS för att tillåta cookies
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Konfigurerar sessioner
app.use(
  session({
    secret: process.env.SESSION_SECRET || "test",
    saveUninitialized: false,
    resave: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60, // Sessionen varar i 1 timme
      sameSite: "lax", // Tillåter cookies för CORS-requests
      secure: false,
    },
  })
);

// Middleware
app.use(express.json());
app.use(express.static(path.join(process.cwd(), "public")));
// app.use(express.static(join(__dirname, "public")));

app.use("/api/user", userRouter);
app.use("/api/products", productsRouter);
app.use("/api/search", searchRouter);
app.use("/admin", adminRouter);
app.use("/api/favorites", favoritesRouter);
app.use("/api/basket", basketRouter);
app.use("/api/new", newProductsRouter);
app.use("/api/register", registerRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/categories", categoriesRouter);

app.get("/", (req, res) => {
  res.send(
    "Välkommen till Freaky Fashions API! Tillgängliga sökvägar: /api/products, /api/search, /admin, /api/favorites, /api/basket, /api/new, /api/register, /api/user"
  );
});

// Felhanterare
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
