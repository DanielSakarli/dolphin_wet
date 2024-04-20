const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const authentication = require('../source/Authentication')

const UserService = require('../services/UserService');

const User = require('../models/User');
const RoleService = require('@carecentive/carecentive-core/services/RoleService');

/// TEST TO SET THE ROLES WITH SEED DATA
router.post('/roles', async function(req, res, next) {
  try {
    if(!req.body.roleName){
      return res.status(400).send("ROLE_NAME_MUST_BE_PROVIDED.");
    } else {
    await RoleService.setRoles(req.body.roleName, req.body.password);
    res.sendStatus(201);
  }
  } catch (err) {
    next(err)
  }
});
////////////////////

router.get('/roles', async function(req, res, next) {
  try {
    let roles = await RoleService.getRoles();
    res.json(roles);
  }
  catch (err) {
    next(err)
  }
});

router.post('/register', async function(req, res, next) {
  try {

    if(!req.body.name) {
      return res.status(400).send("NAME_MUST_BE_PROVIDED.");
    }

    if(!req.body.email) {
      return res.status(400).send("EMAIL_MUST_BE_PROVIDED.");
    }

    if(!req.body.password) {
      return res.status(400).send("PASSWORD_MUST_BE_PROVIDED.");
    }

    if(!req.body.roleName) {
      return res.status(400).send("ROLE_NAME_MUST_BE_PROVIDED.");
    }

    if(!req.body.rolePassword) {
      return res.status(400).send("ROLE_PASSWORD_MUST_BE_PROVIDED.");
    }

    await UserService.register(req.body.name, req.body.email, req.body.password, req.body.roleName, req.body.rolePassword);

    res.sendStatus(200);
  }
  catch (err) {
    next(err)
  }
});

router.post('/login', async function(req, res, next) {
  try {
    let username = req.body.username
    let password = req.body.password

    if(!username) {
      return res.status(400).send("USERNAME_NOT_PROVIDED.");
    }

    if(!password) {
      return res.status(400).send("PASSWORD_NOT_PROVIDED.");
    }

    let token = await UserService.login(username, password)

    ///////TEST////////
    res.setHeader('Set-Cookie', 'token=' + token + '; Secure; HttpOnly; SameSite=None; Path=/; Max-Age=3600');
    ///////////////////

    // Try commenting out this line
    // res.cookie('token', token, { httpOnly:true });
    
    return res.json(token);
  }
  catch (err) {
    next(err)
  }
});

router.get('/logout', async function(req, res, next) {
  try {
    res.clearCookie('token');
    res.end();
  }
  catch (err) {
    next(err)
  }
});

router.post('/changePassword', authentication.authenticateToken, async function(req, res, next) {
  
  try {
    let userId = req.authData.user_id;

    if (!req.body.newPassword || req.body.newPassword === 0) {
      return res.status(400).send("NEW_PASSWORD_NOT_PROVIDED");
    }

    UserService.changePassword(userId, req.body.newPassword);

    // Hash password
    let newPasswordHash = await bcrypt.hash(req.body.newPassword, 12)

    await User.query().patch({
      password_hash: newPasswordHash
    }).findById(userId);

    res.sendStatus(200);
  }
  catch (err) {
    next(err)
  }
});

module.exports = router;