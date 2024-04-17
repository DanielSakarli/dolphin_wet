const RoleService = require('@carecentive/carecentive-core/services/RoleService')
async function loadDummyRole() {
	// Insert dummy user roles.

	// Array of roles, that is: zoos and their passwords
    const roles = [
      {name: 'Nuernberg', password: 'uzh*jq6t1_'},
      {name: 'Duesseldorf', password: 'safdjhc7#s'},
      {name: 'Valencia', password: 'bcu82gs_!n'},
    ];
    for (let role of roles) {
        await RoleService.setRoles(role.name, role.password);
    }

	return;
}

module.exports = loadDummyRole;
