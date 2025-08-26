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
