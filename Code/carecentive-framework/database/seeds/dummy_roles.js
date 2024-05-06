const RoleService = require('../../carecentive/carecentive-core/services/RoleService');

async function loadDummyRole() {
	// Insert dummy user roles.

	// Array of roles, that is: zoos and their passwords
  // These are dummy password for development and are 
  // not being used in production.
    const roles = [
      {name: 'Nuernberg_user', password: '1234'},
      {name: 'Nuernberg_admin', password: '12345' },
      {name: 'Duisburg_user', password: 'safdjhc7#s'},
      {name: 'Duisburg_admin', password: '3456'},
      {name: 'Valencia_user', password: 'bcu82gs_!n'},
      {name: 'Valencia_admin', password: '6789'}
    ];
    for (let role of roles) {
        await RoleService.setRoles(role.name, role.password);
    }

	return;
}

module.exports = loadDummyRole;
