const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { findUserByGoogleId, findUserByEmail, createGoogleUser } = require("../store/userStore");

function configurePassport() {
  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    console.warn(
      "Google OAuth is not configured. Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET to enable it."
    );
    return;
  }

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL:
          process.env.GOOGLE_CALLBACK_URL ||
          "http://localhost:3000/auth/google/callback"
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = findUserByGoogleId(profile.id);

          if (!user) {
            const email = profile.emails?.[0]?.value || null;

            if (email) {
              user = findUserByEmail(email);
            }

            if (!user) {
              user = createGoogleUser({
                googleId: profile.id,
                email,
                displayName: profile.displayName || "Google User"
              });
            } else {
              user.googleId = profile.id;
            }
          }

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
}

module.exports = { passport, configurePassport };
