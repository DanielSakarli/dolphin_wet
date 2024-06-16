const RoleService = require('../../carecentive/carecentive-core/services/RoleService');
require('dotenv').config();

async function loadDummyRole() {
	// Insert dummy user roles.

	// Array of roles, that is: zoos and their passwords
  // These are dummy password for development and are 
  // not being used in production.

    const roles = [
      {name: 'Nuernberg_user', password: process.env.NUERNBERG_USER_PASSWORD},
      {name: 'Nuernberg_admin', password: process.env.NUERNBERG_ADMIN_PASSWORD},
      {name: 'Duisburg_user', password: process.env.DUISBURG_USER_PASSWORD},
      {name: 'Duisburg_admin', password: process.env.DUISBURG_ADMIN_PASSWORD},
      {name: 'Valencia_user', password: process.env.VALENCIA_USER_PASSWORD},
      {name: 'Valencia_admin', password: process.env.VALENCIA_ADMIN_PASSWORD}
    ];

    for (let role of roles) {
        await RoleService.setRoles(role.name, role.password);
    }

	return;
}

module.exports = loadDummyRole;
