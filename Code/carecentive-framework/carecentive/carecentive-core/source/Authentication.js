const jwt = require('jsonwebtoken')
const User = require('../models/User');


/**
 * Express Middleware for token authentication
 */

function authenticateToken(req, res, next) {
  // Extract the Authorization header from the request
  const authHeader = req.headers.authorization;
  console.log('This is the authHeader in our authenticateToken() method: ', authHeader);
  console.log('This is the general req header in our authenticateToken() method: ', req.headers);
  // Check if the Authorization header is present and starts with 'Bearer '
  if (authHeader && authHeader.startsWith('Bearer ')) {
      // Extract the token from the Authorization header
      const token = authHeader.split(' ')[1]; // Extract the token after 'Bearer '

      // Verify the token using the secret key
      jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err, authData) => {
          if (err) {
              // If the token is invalid, respond with a 403 Forbidden status
              return res.sendStatus(403);
          }

          // If the token is valid, attach the decoded data to the request object
          req.authData = authData;

          // Proceed to the next middleware or route handler
          next();
      });
  } else {
      // If no token is found, respond with a 401 Unauthorized status
      res.sendStatus(401);
  }

  /*token = req.cookies.token
  console.log('This is the cookie in our authenticateToken() method: ', token);
  if (token) {
      jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err, authData) => {
          if (err) {
              return res.sendStatus(403);
          }

          req.authData = authData;
          next();
      });
  } else {
      res.sendStatus(401);
  }*/
};

function parseButDoNotAuthenticateToken(req, res, next) {
  token = req.cookies.token

  if (token) {
      jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err, authData) => {
        if (err) {
          req.authData = false;
        }
        else {
          req.authData = authData;
        }

        next();
      });
  } else {
      req.authData = undefined;
      next();
  }
};  

async function authenticateAdmin(req, res, next) {

  if(!req.authData) {
    return res.sendStatus(401);
  }

  let userId = req.authData.user_id;
  let user = await User.query().findById(userId);

  if ( user.role && user.role === 'admin' ) {
    next();
  }
  else {
    return res.sendStatus(401);
  }
};

module.exports = {authenticateToken, parseButDoNotAuthenticateToken, authenticateAdmin}