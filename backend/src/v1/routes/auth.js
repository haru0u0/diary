import express from 'express';
import pg from "pg";
import 'dotenv/config';
import session from "express-session";
import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';

const router = express.Router();
const app = express();

router.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 24 * 60 * 60 * 1000
        }
    })
);
router.use(passport.initialize());
router.use(passport.session());

const db = new pg.Client({
    user: process.env.DB_USR,
    host: process.env.DB_HOST,
    database: process.env.DB_DB,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});
db.connect();

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
        done(null, result.rows[0]);
    } catch (err) {
        done(err);
    }
});

router.get("/secrets", (req, res) => {
    //res.send("secrets")
    console.log(req.user);
    if (req.isAuthenticated()) {
        res.send("authenticated!");
    } else {
        res.send("not authenticated!");
    }
});

router.get("/auth", passport.authenticate("google", {
    scope: ["profile", "email"],
}));

router.get(
    "/auth/port",
    passport.authenticate("google", {
        successRedirect: "http://localhost/api/v1/secrets",
        failureRedirect: "/",
        session: true
    })
);

passport.use("google", new GoogleStrategy({
    clientID: process.env.G_CLIENT_ID,
    clientSecret: process.env.G_CLIENT_SECRET,
    callbackURL: "http://localhost/api/v1/auth/port",
}, async (accessToken, refreshToken, profile, cb) => {
    try {
        const result = await db.query("SELECT * FROM users WHERE email = $1",
            [profile._json.email]
        );
        if (result.rows.length === 0) {
            const newUser = await db.query(
                "INSERT INTO users (email) VALUES ($1)",
                [profile._json.email]
            );
            const createdUser = await db.query("SELECT * FROM users WHERE email = $1",
                [profile._json.email]
            );
            return cb(null, createdUser.rows[0]);
        } else {
            return cb(null, result.rows[0]);
        }
    }
    catch (err) {
        return cb(err);
    }
}
)
);


export default router;