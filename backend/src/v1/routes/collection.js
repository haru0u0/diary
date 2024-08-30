import express from 'express';
import db from '../../../db.js';
import OpenAI from "openai";

const router = express.Router();
const openai = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

router.get("/expression", async (req, res) => {
    const expressions = await db.query(
        "SELECT ve.id, e.expression, ve.explanation, ve.original FROM version_expression ve JOIN expression e ON ve.expression_id = e.id JOIN version v ON ve.version_id = v.id JOIN entry en ON v.entry_id = en.id WHERE en.user_id = $1",
        [req.user.id]);

    res.status(200).json({
        expressions
    });
});


//badge based on date
router.get("/badge/date", async (req, res) => {
    const dateBadge = await db.query(
        "SELECT b.name, v.created_at FROM feedback f JOIN version v ON f.version_id=v.id JOIN badge b on b.id=f.badge_id JOIN entry en ON en.id=v.entry_id WHERE v.created_at >= $1 and v.created_at < $2 and en.user_id=$3 ORDER BY v.created_at desc; ",
        [req.query.start, req.query.end, req.user.id]);

    res.status(200).json({
        dateBadge
    });
});

router.get("/badge/all", async (req, res) => {
    const allBadge = await db.query(
        "SELECT * FROM badge;");

    res.status(200).json({
        allBadge
    });
});

router.get("/badge/user", async (req, res) => {
    const userBadge = await db.query(
        "SELECT DISTINCT b.name FROM feedback f JOIN badge b ON b.id = f.badge_id JOIN version v ON v.id = f.version_id JOIN entry en ON en.id = v.entry_id WHERE en.user_id = $1;",
        [req.user.id]);

    res.status(200).json({
        userBadge
    });
});

export default router;

