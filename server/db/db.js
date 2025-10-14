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
    
    // Lägg till dynamiska kategorier
    const insertCategory = db.prepare(`
      INSERT OR IGNORE INTO categories (name, slug, description, image) 
      VALUES (?, ?, ?, ?)
    `);
    
    const categories = [
      { name: 'Kläder', slug: 'klader', description: 'Fashion clothing items', image: 'clothing.jpg' },
      { name: 'Accessoarer', slug: 'accessoarer', description: 'Fashion accessories', image: 'accessories.jpg' },
      { name: 'Väskor', slug: 'vaskor', description: 'Bags and purses', image: 'bags.jpg' },
      { name: 'Skor', slug: 'skor', description: 'Footwear and shoes', image: 'shoes.jpg' },
      { name: 'Hattar', slug: 'hattar', description: 'Hats and headwear', image: 'hats.jpg' },
      { name: 'Solglasögon', slug: 'solglasogon', description: 'Sunglasses and eyewear', image: 'sunglasses.jpg' },
      { name: 'Kostymer', slug: 'kostymer', description: 'Formal suits and business wear', image: 'suits.jpg' },
      { name: 'Jackor', slug: 'jackor', description: 'Jackets and outerwear', image: 'jackets.jpg' },
      { name: 'Byxor', slug: 'byxor', description: 'Pants and trousers', image: 'pants.jpg' },
      { name: 'Klänningar', slug: 'klanningar', description: 'Dresses and gowns', image: 'dresses.jpg' }
    ];
    
    for (const category of categories) {
      insertCategory.run(category.name, category.slug, category.description, category.image);
    }
    
    console.log("Database schema initialized successfully");
  }
  
  // Seed the database with sample products if empty
  const productCount = db.prepare("SELECT COUNT(*) as count FROM products").get();
  if (productCount.count === 0) {
    console.log("Seeding database with sample products...");
    
    const sampleProducts = [
      { id: 1, sku: "LOAF001", name: "Klassiska loafers", price: "1399", brand: "Freaky Fashion", description: "Eleganta loafers i svart läder, perfekta för både formella och avslappnade tillställningar.", image: "loafers.jpg", slug: "klassiska-loafers", category_id: 4, registrationDate: new Date().toISOString(), isNew: true, isFavourite: false, publicationDate: new Date().toISOString() },
      { id: 2, sku: "ARM001", name: "Armvärmare", price: "599", brand: "Freaky Fashion", description: "Mjuka och varma armvärmare i ull, perfekta för kalla dagar.", image: "armvärmare.jpg", slug: "armvarmare", category_id: 2, registrationDate: new Date().toISOString(), isNew: true, isFavourite: false, publicationDate: new Date().toISOString() },
      { id: 3, sku: "ROCK001", name: "Svart rock i veganskt läder", price: "2499", brand: "Freaky Fashion", description: "Stilren rock i veganskt läder, perfekt för kvällar ut.", image: "svart-rock.jpg", slug: "svart-rock-veganskt-lader", category_id: 1, registrationDate: new Date().toISOString(), isNew: true, isFavourite: false, publicationDate: new Date().toISOString() },
      { id: 4, sku: "JACK001", name: "Mönstrad jacka", price: "1799", brand: "Freaky Fashion", description: "Trendig jacka med unikt mönster, gör dig till centrum för uppmärksamhet.", image: "magenta-jacka.jpg", slug: "monstrad-jacka", category_id: 8, registrationDate: new Date().toISOString(), isNew: true, isFavourite: false, publicationDate: new Date().toISOString() },
      { id: 5, sku: "KOST001", name: "Blå kostym", price: "3000", brand: "Freaky Fashion", description: "Elegant blå kostym för formella tillställningar.", image: "blå-kostym.jpg", slug: "bla-kostym", category_id: 7, registrationDate: new Date().toISOString(), isNew: true, isFavourite: false, publicationDate: new Date().toISOString() },
      { id: 6, sku: "VASKA001", name: "Brun läder väska", price: "1299", brand: "Freaky Fashion", description: "Klassisk brun läder väska, perfekt för daglig användning.", image: "brun-väska.jpg", slug: "brun-lader-vaska", category_id: 3, registrationDate: new Date().toISOString(), isNew: true, isFavourite: false, publicationDate: new Date().toISOString() },
      { id: 7, sku: "KAVAJ001", name: "Grå kavaj", price: "2199", brand: "Freaky Fashion", description: "Stilren grå kavaj för moderna looks.", image: "grå-kavaj.png", slug: "gra-kavaj", category_id: 1, registrationDate: new Date().toISOString(), isNew: true, isFavourite: false, publicationDate: new Date().toISOString() },
      { id: 8, sku: "VASKA002", name: "Grön väska", price: "899", brand: "Freaky Fashion", description: "Trendig grön väska som passar alla tillfällen.", image: "grön-väska.jpg", slug: "gron-vaska", category_id: 3, registrationDate: new Date().toISOString(), isNew: true, isFavourite: false, publicationDate: new Date().toISOString() },
      { id: 9, sku: "BYX001", name: "Kostymbyxor", price: "1599", brand: "Freaky Fashion", description: "Eleganta kostymbyxor för formella tillställningar.", image: "kostymbyxor.jpg", slug: "kostymbyxor", category_id: 9, registrationDate: new Date().toISOString(), isNew: true, isFavourite: false, publicationDate: new Date().toISOString() },
      { id: 10, sku: "SOLG001", name: "Pastell solglasögon", price: "699", brand: "Freaky Fashion", description: "Trendiga pastell solglasögon för sommaren.", image: "pastel-sunglasses.png", slug: "pastell-solglasogon", category_id: 6, registrationDate: new Date().toISOString(), isNew: true, isFavourite: false, publicationDate: new Date().toISOString() },
      { id: 11, sku: "VASKA003", name: "Puss väska", price: "799", brand: "Freaky Fashion", description: "Söt puss väska med unikt design.", image: "puss-väska.png", slug: "puss-vaska", category_id: 3, registrationDate: new Date().toISOString(), isNew: true, isFavourite: false, publicationDate: new Date().toISOString() },
      { id: 12, sku: "SOLG002", name: "Röda solglasögon", price: "599", brand: "Freaky Fashion", description: "Stilrena röda solglasögon för en djärv look.", image: "red-sunglasses.png", slug: "roda-solglasogon", category_id: 6, registrationDate: new Date().toISOString(), isNew: true, isFavourite: false, publicationDate: new Date().toISOString() },
      { id: 13, sku: "SKO001", name: "Rosa klackskor", price: "1199", brand: "Freaky Fashion", description: "Eleganta rosa klackskor för speciella tillfällen.", image: "rosa-klackskor.png", slug: "rosa-klackskor", category_id: 4, registrationDate: new Date().toISOString(), isNew: true, isFavourite: false, publicationDate: new Date().toISOString() },
      { id: 14, sku: "HATT001", name: "Röd hätta", price: "399", brand: "Freaky Fashion", description: "Varm röd hätta för kalla dagar.", image: "röd-hätta.jpg", slug: "rod-hatta", category_id: 5, registrationDate: new Date().toISOString(), isNew: true, isFavourite: false, publicationDate: new Date().toISOString() },
      { id: 15, sku: "KLANN001", name: "Senapsgul byxdress", price: "1899", brand: "Freaky Fashion", description: "Trendig senapsgul byxdress för moderna looks.", image: "senapsgul-byxdress.jpg", slug: "senapsgul-byxdress", category_id: 10, registrationDate: new Date().toISOString(), isNew: true, isFavourite: false, publicationDate: new Date().toISOString() },
      { id: 16, sku: "JACK002", name: "Svart jacka", price: "1499", brand: "Freaky Fashion", description: "Klassisk svart jacka som aldrig går ur tiden.", image: "svart-jacka.jpg", slug: "svart-jacka", category_id: 8, registrationDate: new Date().toISOString(), isNew: true, isFavourite: false, publicationDate: new Date().toISOString() },
      { id: 17, sku: "VASKA004", name: "Svart skinnväska", price: "1699", brand: "Freaky Fashion", description: "Elegant svart skinnväska av hög kvalitet.", image: "svart-skinnväska.png", slug: "svart-skinnvaska", category_id: 3, registrationDate: new Date().toISOString(), isNew: true, isFavourite: false, publicationDate: new Date().toISOString() }
    ];
    
    const insertProduct = db.prepare(`
      INSERT INTO products (
        id, sku, name, price, brand, description, image, slug, 
        category_id, registrationDate, isNew, isFavourite, publicationDate
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    for (const product of sampleProducts) {
      insertProduct.run(
        product.id,
        product.sku,
        product.name,
        product.price,
        product.brand,
        product.description,
        product.image,
        product.slug,
        product.category_id,
        product.registrationDate,
        product.isNew,
        product.isFavourite,
        product.publicationDate
      );
    }
    
    console.log(`Successfully seeded ${sampleProducts.length} products!`);
  }
} catch (error) {
  console.error("Database initialization error:", error);
}

export default db;
