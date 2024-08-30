import express from 'express';
import 'dotenv/config';
import db from '../../../db.js';
import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';

const router = express.Router();

router.get("/", passport.authenticate('google', {
    scope: ['profile', 'email'],
}));

router.get("/port", passport.authenticate("google", {
    successRedirect: "/calendar",
    failureRedirect: "/login",
    session: true
}));

router.get("/isAuthed", (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ authenticated: true, user: req.user.email });
    } else {
        res.json({ authenticated: false });
    }
});

router.post('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        req.session.destroy(function (err) {
            res.clearCookie('connect.sid');
            res.redirect('/');
        });
    });
});
router.post('/delete', async function (req, res, next) {
    console.log("receive a request!")
    const now = new Date();
    const version = await db.query(
        "UPDATE account SET email=NULL, deleted_at=$2 WHERE id=$1",
        [req.user.id, now]);

    req.logout(function (err) {
        if (err) { return next(err); }
        req.session.destroy(function (err) {
            res.clearCookie('connect.sid');
            res.redirect('/');
        });
    });
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