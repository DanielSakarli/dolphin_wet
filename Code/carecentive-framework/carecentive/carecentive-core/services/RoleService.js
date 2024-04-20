const bcrypt = require('bcryptjs');
const Role = require("../models/Role");

const PermissionService = require("./PermissionService");

class RoleService {


/**
   * Inserts roles into the 'roles' table.
   * @param {string[]} roles An array of role names.
   */
  static async setRoles(roleName, password) {
    if(typeof roleName === "string") {
      let password_hash = await bcrypt.hash(password, 12);
      return await Role.query().insert({ name: roleName,  password_hash: password_hash });
    }
  }

  /**
   * Returns all role names from the 'roles' table.
   * @returns {Promise<string[]>} An array of role names.
   */
  static async getRoles() {
    const roles = await Role.query().select('name');
    return roles.map(role => role.name);
  }

  /**
   * 
   * @param {int or string} role The ID or readable name of a role
   * @returns 
   */
  static async getByIdOrName(role) {
    if(typeof role === "number" && Number.isInteger(role)) {
      return await Role.query().findById(role);
    }
    else if(typeof role === "string") {
      return await Role.query().findOne('name', role)
    }
    return false;
  }

  /**
   * Returns the permissions of the specified role as array
   * @param {*} role ID or name of role
   * @returns {array or boolean} Array of permissions or false
   */
  static async getPermissions(role) {
    role = await this.getByIdOrName(role)

    if(role) {
      let permissions = await role.$relatedQuery('permissions') 
      return permissions; 
    }
    return false;
  }
  
  /**
   * Checks whether the specified role has the specified permission
   * @param {*} role ID or readableName
   * @param {*} permission ID or readableName
   * @returns {Boolean}
   */
  static async hasPermission(role, permission) {
    role = await RoleService.getByIdOrName(role)
    permission = await PermissionService.getByIdOrName(permission)

    if(role === false || permission === false) {
      return false;
    }

    let rolePermissions = await this.getPermissions(role.id)
    
    if(rolePermissions) {
      for (let rolePermission of rolePermissions) {
        if(rolePermission.id === permission.id) {
          return true;
        }
      }
    }

    return false;
  }
}

module.exports = RoleService;