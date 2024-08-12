import express from "express";
import cors from "cors";
import testRouter from "./src/v1/routes/test.js";
import authRouter from "./src/v1/routes/auth.js";
import entryRouter from "./src/v1/routes/entry.js"
import 'dotenv/config';
import session from "express-session";
import passport from 'passport';
import db from './db.js';

const port = 5000;
const app = express();

//to avoid cross-origin error 
app.use(cors({
    origin: "http://localhost:3000",
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
    console.log("serialize");
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    console.log("deserialize");
    console.log("id:" + id);
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


//to debug
app.listen(port, () => {
    console.log("listening on " + port)
});