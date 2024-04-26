const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const User = require('../models/User');
const Role = require('../models/Role');

const RoleService = require('./RoleService')

class UserService {

  static async register(name, email, password, roleName, rolePassword) {

    // Ensure that username does not already exist
    let userCount = await User.query().where('name', name).resultSize();

    // if user does already exist, cancel
    if (userCount !== 0) {
      throw new Error("USER_ALREADY_EXISTS")
    }

    // Hash password
    let password_hash = await bcrypt.hash(password, 12)

    // Role names
    const roleNameAdmin = roleName + '_admin';
    const roleNameUser = roleName + '_user';

    // Get role ID from role name
    let role_admin = await Role.query().findOne({ name: roleNameAdmin });
    let role_user = await Role.query().findOne({ name: roleNameUser });

    if(!role_admin && !role_user) {
      throw new Error("ROLE_DOES_NOT_EXIST");
    } else {
    console.log('Shortly before comparing the role pw ');
    // If role exists compare hashed passwords
    if (bcrypt.compareSync(rolePassword, role_admin.password_hash)) {
      try {

      // Store user data in database now that role and rolePassword is confirmed
      await User.query().insert({
        name: name,
        email: email,
        password_hash: password_hash
      });

      console.log('I got here');
    
      console.log('This is the role id that we got from UserService.js: ' + role_admin.id);
    
      // Get user
      let user = await User.query().where('name', name).first();
      console.log('This is the user id that we got from UserService.js: ' + user.id);

      // Create association between user and role
      await user.$relatedQuery('roles').for(user.id).relate(role_admin.id);
      }
      catch (err) {
        throw new Error("USER_INSERTION_IN_DATABASE_WENT_WRONG");
      }
    }
    
    if (bcrypt.compareSync(rolePassword, role_user.password_hash)) {
      try {

      // Store user data in database now that role and rolePassword is confirmed
      await User.query().insert({
        name: name,
        email: email,
        password_hash: password_hash
      });

      console.log('I got here');
    
      console.log('This is the role id that we got from UserService.js: ' + role_user.id);
    
      // Get user
      let user = await User.query().where('name', name).first();
      console.log('This is the user id that we got from UserService.js: ' + user.id);

      // Create association between user and role
      await user.$relatedQuery('roles').for(user.id).relate(role_user.id);
      }
      catch (err) {
        throw new Error("USER_INSERTION_IN_DATABASE_WENT_WRONG");
      }
    }
    
    
    if (!bcrypt.compareSync(rolePassword, role_admin.password_hash) && !bcrypt.compareSync(rolePassword, role_user.password_hash)) {
      throw new Error("ROLE_PASSWORD_IS_WRONG");
    }
  }
  }

  /**
   * @param {*} username 
   * @param {*} password 
   * @returns JWT string
   */
  static async login(name, password) {

    // Get user
    let user = await User.query().where('name', name);

    // If user does not exist, cancel
    if (user.length === 0 || user.length > 1) {
      throw new Error("INVALID_NAME_OR_PASSWORD");
    }

    // Compare hashes
    if (bcrypt.compareSync(password, user[0].password_hash)) {
      // Distribute JWT
      let token = jwt.sign({
        "user_id": user[0].id,
        "name": user[0].name,
      }, process.env.JWT_TOKEN_SECRET, { expiresIn: '12h' });

      return token;
    }
    else {
      throw new Error("INVALID_NAME_OR_PASSWORD");
    }
  }

  static async changePassword(name, currentPassword, newPassword) {
    // First, check that user knows the current password
    if (await this.login(name, currentPassword)) {

    // Hash password
    let newPasswordHash = await bcrypt.hash(newPassword, 12)
    // Change password
    await User.query().patch({
      password_hash: newPasswordHash
    }).where('name', name);
    }

    return;
  }

  /**
   * Returns an array of the roles for this user
   * @param {*} userId
   * @returns {Array or false}
   */
  static async getRoles(userId) {
    let user = await User.query().findById(userId)
    let roles = await user.$relatedQuery('roles')
    return roles
  }

  /**
   * Checks whether a specified user ID has a certain role
   * @param {*} userId 
   * @param {*} role ID or name
   * @returns {Boolean} Whether the user has this role orn ot
   */
  static async hasRole(userId, role) {
    role = await RoleService.getByIdOrName(role)
    let userRoles = await this.getRoles(userId)

    if(userRoles) {
      for (let userRole of userRoles) {
        if(userRole.id === role.id) {
          return true;
        }
      }
    }

    return false;
  }

  /**
   * @param {int} userId 
   * @param {int or string} permission as id or readable name
   * @returns {boolean} whether the user has this permission
   */
  static async hasPermission(userId, permission) {
    let roles = await this.getRoles(userId)

    for(let role of roles) {
      let hasPermission = await RoleService.hasPermission(role.id, permission)

      if(hasPermission === true) {
        return true
      } 
    }

    return false
  }
}

module.exports = UserService;