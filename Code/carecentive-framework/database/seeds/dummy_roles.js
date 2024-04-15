const RoleService = require('@carecentive/carecentive-core/services/RoleService')
async function loadDummyRole() {
	// Insert dummy user roles.

	// Array of roles, that is: zoos
    const roles = ['nuernberg', 'duesseldorf', 'valencia'];
    for (let role of roles) {
        await RoleService.setRoles(role);
    }

	return;
}

module.exports = loadDummyRole;
