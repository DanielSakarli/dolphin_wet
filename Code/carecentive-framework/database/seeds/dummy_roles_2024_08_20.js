const RoleService = require('../../carecentive/carecentive-core/services/RoleService');
require('dotenv').config();

async function loadDummyRole() {
	// Insert dummy user roles.

    // Array of roles, that is: zoos and their passwords

    const roles = [
      {name: 'Albufeira_user', password: process.env.ALBUFEIRA_USER_PASSWORD},
        {name: 'Albufeira_admin', password: process.env.ALBUFEIRA_ADMIN_PASSWORD},
        {name: 'Antibes_user', password: process.env.ANTIBES_USER_PASSWORD},
        {name: 'Antibes_admin', password: process.env.ANTIBES_ADMIN_PASSWORD},
        {name: 'Benidorm_user', password: process.env.BENIDORM_USER_PASSWORD},
        {name: 'Benidorm_admin', password: process.env.BENIDORM_ADMIN_PASSWORD},
        {name: 'Boudewijn_user', password: process.env.BOUDEWIJN_USER_PASSWORD},
        {name: 'Boudewijn_admin', password: process.env.BOUDEWIJN_ADMIN_PASSWORD},
        {name: 'Cancun_user', password: process.env.CANCUN_USER_PASSWORD},
        {name: 'Cancun_admin', password: process.env.CANCUN_ADMIN_PASSWORD},
        {name: 'Cozumel_user', password: process.env.COZUMEL_USER_PASSWORD},
        {name: 'Cozumel_admin', password: process.env.COZUMEL_ADMIN_PASSWORD},
        {name: 'Genova_user', password: process.env.GENOVA_USER_PASSWORD},
        {name: 'Genova_admin', password: process.env.GENOVA_ADMIN_PASSWORD},
        {name: 'Kolmarden_user', password: process.env.KOLMARDEN_USER_PASSWORD},
        {name: 'Kolmarden_admin', password: process.env.KOLMARDEN_ADMIN_PASSWORD},
        {name: 'Lisbon_user', password: process.env.LISBON_USER_PASSWORD},
        {name: 'Lisbon_admin', password: process.env.LISBON_ADMIN_PASSWORD},
        {name: 'Loro_user', password: process.env.LORO_USER_PASSWORD},
        {name: 'Loro_admin', password: process.env.LORO_ADMIN_PASSWORD},
        {name: 'Portsaintpere_user', password: process.env.PORTSAINTPERE_USER_PASSWORD},
        {name: 'Portsaintpere_admin', password: process.env.PORTSAINTPERE_ADMIN_PASSWORD},
        {name: 'Rancho_user', password: process.env.RANCHO_USER_PASSWORD},
        {name: 'Rancho_admin', password: process.env.RANCHO_ADMIN_PASSWORD},
        {name: 'Torvaianica_user', password: process.env.TORVAIANICA_USER_PASSWORD},
        {name: 'Torvaianica_admin', password: process.env.TORVAIANICA_ADMIN_PASSWORD},
      
    ];

    for (let role of roles) {
        await RoleService.setRoles(role.name, role.password);
    }

	return;
}

module.exports = loadDummyRole;
