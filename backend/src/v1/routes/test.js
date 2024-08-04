import express from 'express';
import pg from "pg";
import 'dotenv/config';
const router = express.Router();

const db = new pg.Client({
    user: process.env.DB_USR,
    host: process.env.DB_HOST,
    database: process.env.DB_DB,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

db.connect();

router.get("/test", async (req, res) => {
    req.query.country = "Japan";
    const data = await db.query("SELECT * FROM capitals WHERE country = $1", [req.query.country]);

    res.json({
        "capital": data.rows[0].capital,
    });
})


export default router;