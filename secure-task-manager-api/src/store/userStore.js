const { randomUUID } = require("crypto");

const users = [];

function safeUser(user) {
  return {
    id: user.id,
    email: user.email,
    displayName: user.displayName,
    authProvider: user.authProvider
  };
}

function findUserById(id) {
  return users.find((user) => user.id === id) || null;
}

function findUserByEmail(email) {
  if (!email) return null;

  return (
    users.find(
      (user) => user.email?.toLowerCase() === String(email).toLowerCase()
    ) || null
  );
}

function findUserByGoogleId(googleId) {
  return users.find((user) => user.googleId === googleId) || null;
}

function createLocalUser({ email, passwordHash, displayName }) {
  const user = {
    id: randomUUID(),
    email: email.toLowerCase(),
    passwordHash,
    displayName,
    googleId: null,
    authProvider: "local"
  };

  users.push(user);
  return user;
}

function createGoogleUser({ googleId, email, displayName }) {
  const user = {
    id: randomUUID(),
    email: email?.toLowerCase() || null,
    passwordHash: null,
    displayName,
    googleId,
    authProvider: "google"
  };

  users.push(user);
  return user;
}

module.exports = {
  users,
  safeUser,
  findUserById,
  findUserByEmail,
  findUserByGoogleId,
  createLocalUser,
  createGoogleUser
};
