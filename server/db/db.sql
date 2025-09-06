-- Skapar tabellen "products" med nödvändiga kolumner
CREATE TABLE "products" (
    id INTEGER PRIMARY KEY,
    sku TEXT,
    name TEXT,
    price TEXT,
    brand TEXT,
    description TEXT,
    image TEXT,
    slug TEXT,
    category TEXT,
    registrationDate DATETIME,
    isNew BOOLEAN,
    isFavourite BOOLEAN
, publicationDate TEXT);

-- Skapar kategoritabellen
CREATE TABLE categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL,
    description TEXT
);

-- Skapar en ny tabell "products_new" med en foreign key till kategorier
CREATE TABLE "products_new" (
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

-- Lägger till kolumnen category_id i den befintliga produkttabellen
ALTER TABLE products ADD COLUMN category_id INTEGER;

-- Lägger till foreign key constraint för category_id
ALTER TABLE products ADD CONSTRAINT fk_products_category 
    FOREIGN KEY (category_id) REFERENCES categories(id);

-- Kopierar data från gamla tabellen till nya tabellen med korrekt kategorimappning
INSERT INTO products_new (
    id, sku, name, price, brand, description, image, slug, 
    category_id, registrationDate, isNew, isFavourite, publicationDate
)
SELECT 
    product.id, 
    product.sku, 
    product.name, 
    product.price, 
    product.brand, 
    product.description, 
    product.image, 
    product.slug,
    category.id as category_id,
    product.registrationDate, 
    product.isNew, 
    product.isFavourite, 
    product.publicationDate
FROM products product
LEFT JOIN categories category ON product.category = category.name;

-- Kopierar data från gamla tabellen till nya tabellen med korrekt kategorimappning
INSERT INTO products_new SELECT id, sku, name, price, brand, description, image, slug, 
(SELECT id FROM categories WHERE name = products.category), 
registrationDate, isNew, isFavourite, publicationDate FROM products;

-- Raderar gamla produkttabellen
DROP TABLE products;

-- Byter namn på den nya tabellen till "products"
 ALTER TABLE products_new RENAME TO products;

-- Skapar tabellen "users" för användarautentisering
CREATE TABLE "users" (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

-- Uppdaterar userstabellen för att lägga till isAdmin-kolumnen
ALTER TABLE users 
ADD COLUMN isAdmin BOOLEAN DEFAULT 0;

-- Skapar tabellen categories för produktkategorier
CREATE TABLE categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL,
    description TEXT
);

-- Skapar tabellen orders för beställningar
CREATE TABLE orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER DEFAULT 1,
    order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Skapar tabellen order_items för saker i beställningen
CREATE TABLE order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER DEFAULT 1,
    price REAL NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Skapar tabellen favorites för favoriter
CREATE TABLE favorites (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    UNIQUE(user_id, product_id), -- Säkerställer att en produkt bara kan favoritmarkeras en gång per användare
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Trigger för att uppdatera isNew-fältet baserat på registrationDate
-- Om registrationDate ändras, uppdatera isNew till 1 om produkten är registrerad inom de senaste 7 dagarna, annars sätt till 0
CREATE TRIGGER update_isNew_after_registrationDate_change
AFTER UPDATE ON products
FOR EACH ROW
WHEN NEW.registrationDate != OLD.registrationDate  -- Kontrollerar om värdet på registrationDate har ändrats
BEGIN
  UPDATE products
  SET isNew = CASE
    WHEN julianday('now') - julianday(NEW.registrationDate) <= 7 THEN 1
    ELSE 0
  END
  WHERE id = NEW.id;  -- Uppdaterar produkten med det nya värdet för isNew
END
