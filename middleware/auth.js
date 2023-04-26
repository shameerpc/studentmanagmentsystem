const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const secret = process.env.JWT_SECRET;

function generateToken(payload) {
  return jwt.sign(payload, secret);
}

function verifyToken(token) {
  return jwt.verify(token, secret);
}

module.exports = {
  generateToken,
  verifyToken,
};
