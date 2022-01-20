const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");

const EXPIRES_IN = 60 * 60 * 24;
const ALGORITHM = "HS256";
const ISSUER = "admin@innosoftworld.com";
const AUDIENCE = "admin@innosoftworld.com";

const jwtSecret = process.env.TOKEN_SECRET || "2d051e884879a8c8456a290abd49e334";
const jwtConfig = {
  algorithm: ALGORITHM,
  expiresIn: EXPIRES_IN,
  issuer: ISSUER,
  audience: AUDIENCE
};

module.exports = {
  /**
   * Hash the password field of the passed user.
   */
  hashPassword: password => {
    return (password = password ? bcrypt.hashSync(password) : "");
  },

  /**
   * Compare user password hash with unhashed password
   * @returns boolean indicating a match
   */

  comparePassword: (password, dbPassword) => {
    return bcrypt.compareSync(password, dbPassword);
  },

  /**
   * Create a token based on the passed user
   * @param user
   */
  createToken: user => {
    return jwt.sign({ user: user }, jwtSecret, jwtConfig);
  },

  /**
   * Verify a token based on the passed user
   * @param token
   */
  verifyToken: token => {
    return jwt.verify(token, jwtSecret, jwtConfig);
  }
};
