// Database seeding script for Vercel deployment
// This will populate the database with sample products on each deployment

import db from "./server/db/db.js";

// Sample products data
const sampleProducts = [
  {
    id: 1,
    sku: "LOAF001",
    name: "Klassiska loafers",
    price: "1399",
    brand: "Freaky Fashion",
    description: "Eleganta loafers i svart läder, perfekta för både formella och avslappnade tillställningar.",
    image: "loafers.jpg",
    slug: "klassiska-loafers",
    category_id: 1,
    registrationDate: new Date().toISOString(),
    isNew: true,
    isFavourite: false,
    publicationDate: new Date().toISOString()
  },
  {
    id: 2,
    sku: "ARM001",
    name: "Armvärmare",
    price: "599",
    brand: "Freaky Fashion",
    description: "Mjuka och varma armvärmare i ull, perfekta för kalla dagar.",
    image: "armvärmare.jpg",
    slug: "armvarmare",
    category_id: 1,
    registrationDate: new Date().toISOString(),
    isNew: true,
    isFavourite: false,
    publicationDate: new Date().toISOString()
  },
  {
    id: 3,
    sku: "ROCK001",
    name: "Svart rock i veganskt läder",
    price: "2499",
    brand: "Freaky Fashion",
    description: "Stilren rock i veganskt läder, perfekt för kvällar ut.",
    image: "svart-rock.jpg",
    slug: "svart-rock-veganskt-lader",
    category_id: 1,
    registrationDate: new Date().toISOString(),
    isNew: true,
    isFavourite: false,
    publicationDate: new Date().toISOString()
  },
  {
    id: 4,
    sku: "JACK001",
    name: "Mönstrad jacka",
    price: "1799",
    brand: "Freaky Fashion",
    description: "Trendig jacka med unikt mönster, gör dig till centrum för uppmärksamhet.",
    image: "magenta-jacka.jpg",
    slug: "monstrad-jacka",
    category_id: 1,
    registrationDate: new Date().toISOString(),
    isNew: true,
    isFavourite: false,
    publicationDate: new Date().toISOString()
  },
  {
    id: 5,
    sku: "KOST001",
    name: "Blå kostym",
    price: "3000",
    brand: "Freaky Fashion",
    description: "Elegant blå kostym för formella tillställningar.",
    image: "blå-kostym.jpg",
    slug: "bla-kostym",
    category_id: 1,
    registrationDate: new Date().toISOString(),
    isNew: true,
    isFavourite: false,
    publicationDate: new Date().toISOString()
  },
  {
    id: 6,
    sku: "VASKA001",
    name: "Brun läder väska",
    price: "1299",
    brand: "Freaky Fashion",
    description: "Klassisk brun läder väska, perfekt för daglig användning.",
    image: "brun-väska.jpg",
    slug: "brun-lader-vaska",
    category_id: 3,
    registrationDate: new Date().toISOString(),
    isNew: true,
    isFavourite: false,
    publicationDate: new Date().toISOString()
  },
  {
    id: 7,
    sku: "KAVAJ001",
    name: "Grå kavaj",
    price: "2199",
    brand: "Freaky Fashion",
    description: "Stilren grå kavaj för moderna looks.",
    image: "grå-kavaj.png",
    slug: "gra-kavaj",
    category_id: 1,
    registrationDate: new Date().toISOString(),
    isNew: true,
    isFavourite: false,
    publicationDate: new Date().toISOString()
  },
  {
    id: 8,
    sku: "VASKA002",
    name: "Grön väska",
    price: "899",
    brand: "Freaky Fashion",
    description: "Trendig grön väska som passar alla tillfällen.",
    image: "grön-väska.jpg",
    slug: "gron-vaska",
    category_id: 3,
    registrationDate: new Date().toISOString(),
    isNew: true,
    isFavourite: false,
    publicationDate: new Date().toISOString()
  },
  {
    id: 9,
    sku: "BYX001",
    name: "Kostymbyxor",
    price: "1599",
    brand: "Freaky Fashion",
    description: "Eleganta kostymbyxor för formella tillställningar.",
    image: "kostymbyxor.jpg",
    slug: "kostymbyxor",
    category_id: 1,
    registrationDate: new Date().toISOString(),
    isNew: true,
    isFavourite: false,
    publicationDate: new Date().toISOString()
  },
  {
    id: 10,
    sku: "SOLG001",
    name: "Pastell solglasögon",
    price: "699",
    brand: "Freaky Fashion",
    description: "Trendiga pastell solglasögon för sommaren.",
    image: "pastel-sunglasses.png",
    slug: "pastell-solglasogon",
    category_id: 2,
    registrationDate: new Date().toISOString(),
    isNew: true,
    isFavourite: false,
    publicationDate: new Date().toISOString()
  },
  {
    id: 11,
    sku: "VASKA003",
    name: "Puss väska",
    price: "799",
    brand: "Freaky Fashion",
    description: "Söt puss väska med unikt design.",
    image: "puss-väska.png",
    slug: "puss-vaska",
    category_id: 3,
    registrationDate: new Date().toISOString(),
    isNew: true,
    isFavourite: false,
    publicationDate: new Date().toISOString()
  },
  {
    id: 12,
    sku: "SOLG002",
    name: "Röda solglasögon",
    price: "599",
    brand: "Freaky Fashion",
    description: "Stilrena röda solglasögon för en djärv look.",
    image: "red-sunglasses.png",
    slug: "roda-solglasogon",
    category_id: 2,
    registrationDate: new Date().toISOString(),
    isNew: true,
    isFavourite: false,
    publicationDate: new Date().toISOString()
  },
  {
    id: 13,
    sku: "SKO001",
    name: "Rosa klackskor",
    price: "1199",
    brand: "Freaky Fashion",
    description: "Eleganta rosa klackskor för speciella tillfällen.",
    image: "rosa-klackskor.png",
    slug: "rosa-klackskor",
    category_id: 1,
    registrationDate: new Date().toISOString(),
    isNew: true,
    isFavourite: false,
    publicationDate: new Date().toISOString()
  },
  {
    id: 14,
    sku: "HATT001",
    name: "Röd hätta",
    price: "399",
    brand: "Freaky Fashion",
    description: "Varm röd hätta för kalla dagar.",
    image: "röd-hätta.jpg",
    slug: "rod-hatta",
    category_id: 2,
    registrationDate: new Date().toISOString(),
    isNew: true,
    isFavourite: false,
    publicationDate: new Date().toISOString()
  },
  {
    id: 15,
    sku: "KLANN001",
    name: "Senapsgul byxdress",
    price: "1899",
    brand: "Freaky Fashion",
    description: "Trendig senapsgul byxdress för moderna looks.",
    image: "senapsgul-byxdress.jpg",
    slug: "senapsgul-byxdress",
    category_id: 1,
    registrationDate: new Date().toISOString(),
    isNew: true,
    isFavourite: false,
    publicationDate: new Date().toISOString()
  },
  {
    id: 16,
    sku: "JACK002",
    name: "Svart jacka",
    price: "1499",
    brand: "Freaky Fashion",
    description: "Klassisk svart jacka som aldrig går ur tiden.",
    image: "svart-jacka.jpg",
    slug: "svart-jacka",
    category_id: 1,
    registrationDate: new Date().toISOString(),
    isNew: true,
    isFavourite: false,
    publicationDate: new Date().toISOString()
  },
  {
    id: 17,
    sku: "VASKA004",
    name: "Svart skinnväska",
    price: "1699",
    brand: "Freaky Fashion",
    description: "Elegant svart skinnväska av hög kvalitet.",
    image: "svart-skinnväska.png",
    slug: "svart-skinnvaska",
    category_id: 3,
    registrationDate: new Date().toISOString(),
    isNew: true,
    isFavourite: false,
    publicationDate: new Date().toISOString()
  }
];

// Function to seed the database
function seedDatabase() {
  try {
    console.log("Starting database seeding...");
    
    // Check if products already exist
    const existingProducts = db.prepare("SELECT COUNT(*) as count FROM products").get();
    
    if (existingProducts.count > 0) {
      console.log(`Database already has ${existingProducts.count} products. Skipping seed.`);
      return;
    }
    
    // Insert sample products
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
    
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

// Run seeding if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase();
}

export default seedDatabase;
