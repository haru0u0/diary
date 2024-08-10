import express from 'express';
import db from '../../../db.js';
import moment from 'moment';

const router = express.Router();

router.post("/new", async (req, res) => {
    const newEntry = await db.query(
        "INSERT INTO entry (user_id) VALUES ($1) RETURNING id",
        [req.user.id]);

    const newVersion = await db.query(
        "INSERT INTO version (entry_id, version_num, content) VALUES ($1, 0, $2) RETURNING id",
        [newEntry.rows[0].id, req.body.diary]);

    res.status(200).json({
        "version_id": newVersion.rows[0].id,
        "entry_id": newEntry.rows[0].id
    });
});

router.get("/version", async (req, res) => {
    const version = await db.query(
        "SELECT * from version WHERE id=$1",
        [req.query.id]);

    res.status(200).json({
        version
    });
});

//get entries on the selected date, with the content of the latest version of each entry 
router.get("/date", async (req, res) => {
    console.log(req.query.start);
    console.log(req.query.end);
    const dateEntry = await db.query(
        "SELECT DISTINCT ON (e.id) e.id, e.user_id, e.is_deleted, v.id AS version_id, v.version_num, v.content, v.created_at FROM entry e JOIN version v ON e.id = v.entry_id WHERE e.user_id = $3 and e.is_deleted = false and e.created_at >= $1 and e.created_at < $2 ORDER BY e.id, v.created_at DESC;",
        [req.query.start, req.query.end, req.user.id]);

    res.status(200).json({
        dateEntry
    });
});

export default router;