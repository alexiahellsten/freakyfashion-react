import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let dbPath;
if (process.env.VERCEL) {
 // Använder en temporär sökväg som skapas på varje funktion som anropas
  dbPath = "/tmp/product-manager.db";
} else {
  // Lokal utveckling
  dbPath = path.join(__dirname, "product-manager.db");
}

const db = new Database(dbPath, {
  fileMustExist: false, // Tillåter att skapa databasen om den inte finns
  verbose: process.env.NODE_ENV === "development" ? console.log : undefined
});

// Initiera databasens schema om det inte finns
try {
  // Kontrollera om tabeller finns, om inte skapa dem
  const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
  
  if (tables.length === 0) {
    console.log("Initializing database schema...");
    
    // Skapa kategoritabellen först (refererad av produkter)
    db.exec(`
      CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL,
        description TEXT,
        slug TEXT,
        image TEXT
      );
    `);
    
    // Skapa produkttabellen
    db.exec(`
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY,
        sku TEXT,
        name TEXT,
        price TEXT,
        brand TEXT,
        description TEXT,
        image TEXT,
        slug TEXT,
        category_id INTEGER,
        registrationDate DATETIME,
        isNew BOOLEAN,
        isFavourite BOOLEAN,
        publicationDate TEXT,
        FOREIGN KEY (category_id) REFERENCES categories(id)
      );
    `);
    
    // Skapa användartabellen
    db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        isAdmin BOOLEAN DEFAULT 0
      );
    `);
    
    // Skapa beställningstabellen
    db.exec(`
      CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        product_id INTEGER NOT NULL,
        quantity INTEGER DEFAULT 1,
        order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      );
    `);
    
    // Skapa order_items tabellen
    db.exec(`
      CREATE TABLE IF NOT EXISTS order_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_id INTEGER NOT NULL,
        product_id INTEGER NOT NULL,
        quantity INTEGER DEFAULT 1,
        price REAL NOT NULL,
        FOREIGN KEY (order_id) REFERENCES orders(id),
        FOREIGN KEY (product_id) REFERENCES products(id)
      );
    `);
    
    // Skapa favoritstabellen
    db.exec(`
      CREATE TABLE IF NOT EXISTS favorites (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        product_id INTEGER NOT NULL,
        UNIQUE(user_id, product_id),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE
      );
    `);
    
    // Skapa varukorgstabellen
    db.exec(`
      CREATE TABLE IF NOT EXISTS basket (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        product_id INTEGER NOT NULL,
        quantity INTEGER NOT NULL DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, product_id),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE
      );
    `);
    
    // Lägg till några exempelkategorier
    const insertCategory = db.prepare(`
      INSERT OR IGNORE INTO categories (name, slug, description) 
      VALUES (?, ?, ?)
    `);
    
    insertCategory.run('Kläder', 'klader', 'Fashion clothing items');
    insertCategory.run('Accessoarer', 'accessoarer', 'Fashion accessories');
    insertCategory.run('Väskor', 'vaskor', 'Bags and purses');
    
    console.log("Database schema initialized successfully");
  }
} catch (error) {
  console.error("Database initialization error:", error);
}

export default db;
