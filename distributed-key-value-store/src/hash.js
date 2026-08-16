const crypto = require("crypto");

/**
 * Convert an arbitrary string to a deterministic 32-bit unsigned integer.
 * SHA-256 is used only as a convenient stable hash source for this simulation.
 */
function hashToUInt32(value) {
  const digest = crypto
    .createHash("sha256")
    .update(String(value))
    .digest();

  return digest.readUInt32BE(0);
}

module.exports = {
  hashToUInt32
};
