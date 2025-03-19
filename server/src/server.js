import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname, join } from "path"; 

import productsRouter from "./routes/products.js";
import searchRouter from "./routes/search.js";
import adminRouter from "./routes/admin.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json()); 
app.use(express.static(join(__dirname, 'public')));

app.use("/api/products", productsRouter);
app.use("/api/search", searchRouter);
app.use("/admin", adminRouter);

app.get("/", (req, res) => {
  res.send("Välkommen till Freaky Fashions API! Tillgängliga sökvägar: /api/products, /api/search, /admin");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
