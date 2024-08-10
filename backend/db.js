import pg from "pg";
import 'dotenv/config';

const db = new pg.Client({
    user: process.env.DB_USR,
    host: process.env.DB_HOST,
    database: process.env.DB_DB,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});
db.connect();

export default db;