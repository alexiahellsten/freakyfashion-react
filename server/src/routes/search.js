import express from "express";
const router = express.Router();

import db from "../../db/db.js";

router.get('/', function(req, res, next) {
    const search = req.query.q;

    let select;
    let rows;

    if (search) {
        select = db.prepare(`
      SELECT id,
             sku,
             name,
             price,
             brand,
             description,
             image,
             slug,
             registrationDate,
             isNew,
             isFavourite
      FROM products
      WHERE name LIKE CONCAT ('%', ?, '%')
    `);

        rows = select.all(search);

    } else {
        select = db.prepare(`
      SELECT id,
             sku,
             name,
             price,
             brand,
             description,
             image,
             slug,
             registrationDate,
             isNew,
             isFavourite
      FROM products
    `);

        rows = select.all();
    }

    res.render("search", {
        title: 'Freaky Fashion',
        products: rows
    });
});

router.get('/search', function(req, res, next) {
    const search = req.query.q;

    let select;
    let rows;

    if (search && search.trim()) {
        select = db.prepare(`
      SELECT id,
             sku,
             name,
             price,
             brand,
             description,
             image,
             slug,
             registrationDate,
             isNew,
             isFavourite
      FROM products
      WHERE name LIKE CONCAT ('%', ?, '%')
    `);

        rows = select.all(search.trim());

    } else {
        select = db.prepare(`
      SELECT id,
             sku,
             name,
             price,
             brand,
             description,
             image,
             slug,
             registrationDate,
             isNew,
             isFavourite
      FROM products
    `);

        rows = select.all();
    }

    res.render("search", {
        title: 'Freaky Fashion',
        products: rows
    });
});

export default router;