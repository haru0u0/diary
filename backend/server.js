import express from "express";
import cors from "cors";
import testRouter from "./src/v1/routes/test.js";
import authRouter from "./src/v1/routes/auth.js";
import entryRouter from "./src/v1/routes/entry.js"
import collectionRouter from "./src/v1/routes/collection.js"
import 'dotenv/config';
import session from "express-session";
import passport from 'passport';
import db from './db.js';

const port = 5000;
const app = express();

//to avoid cross-origin error 
app.use(cors({
    origin: "http://127.0.0.1:3000",
    credentials: true
}))

//session management
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 24 * 60 * 60 * 1000
        }
    })
);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const result = await db.query("SELECT * FROM account WHERE id = $1", [id]);
        done(null, result.rows[0]);
    } catch (err) {
        done(err);
    }
});

//format req into json
app.use(express.json());

//routing
app.use('/api/v1', testRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/entry', entryRouter);
app.use('/api/v1/collection', collectionRouter);


//to debug
app.listen(port, () => {
    console.log("listening on " + port)
});