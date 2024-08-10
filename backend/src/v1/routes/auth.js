import express from 'express';
import 'dotenv/config';
import db from '../../../db.js';
import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';

const router = express.Router();

router.get("/", passport.authenticate("google", {
    scope: ["profile", "email"],
}));

router.get("/port", passport.authenticate("google", {
    successRedirect: "/calendar",
    failureRedirect: "/login",
    session: true
}));

router.get("/isAuthed", (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ authenticated: true });
    } else {
        res.json({ authenticated: false });
    }
    console.log(req.user);
});

// signing up or logging in
passport.use("google", new GoogleStrategy({
    clientID: process.env.G_CLIENT_ID,
    clientSecret: process.env.G_CLIENT_SECRET,
    callbackURL: "http://localhost/api/v1/auth/port",
}, async (accessToken, refreshToken, profile, cb) => {
    try {
        const result = await db.query("SELECT * FROM account WHERE email = $1",
            [profile._json.email]
        );
        if (result.rows.length === 0) {
            const newUser = await db.query(
                "INSERT INTO account (email) VALUES ($1)",
                [profile._json.email]);
            const createdUser = await db.query("SELECT * FROM account WHERE email = $1",
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
}));




export default router;