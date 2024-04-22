const User = require('../carecentive/carecentive-core/models/User');

/**
 * Wraps the authenticateToken middleware provided by carecentive with a isUserAuth parameter.
 * So that I can control whether do user auth in this middleware.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function roleAuthorizerGet(req, res, next) {
    try {
    const userID = req.authData.user_id;
    const role = await User.query().findById(userID).withGraphFetched('roles');

    // Split the role string into an array of substrings
    console.log('role object in roleAuthorizerGet: ', role);
        // Check if the user has a role
        if (role.roles.length > 0) {
        const role_parts = role.roles[0].name.split('_');
    
        // Check if the role is 'admin' or 'user'
        const firstPart = role_parts[0];
        const secondPart = role_parts[1];
        if (secondPart === 'admin') {
            // Save the role name (e.g. 'Nuernberg') into req.role
            req.role = firstPart;
            next();
        } else {
            res.status(403).send({ error: 'USER_NOT_AN_ADMINISTRATOR' });
        }
    } else {
        res.status(400).send({ error: 'USER_HAS_NO_ROLE' });
    }
    } catch (error) {
        res.status(400).send({ error: 'USER_HAS_NO_ROLE' });
    }
}

async function roleAuthorizerPost(req, res, next) {
   try {
    const userID = req.authData.user_id;
    const role = await User.query().findById(userID).withGraphFetched('roles');
    // Split the role string into an array of substrings
    console.log('role object in roleAuthorizerGet: ', role);
        // Check if the user has a role
        if (role.roles.length > 0) {
        const role_parts = role.roles[0].name.split('_');
        
        // Save the first part of role name (e.g. 'Nuernberg')
        const firstPart = role_parts[0];
        req.role = firstPart;
        console.log('Role in roleAuthorizerPost: ', req.role);
        next();
        } else {
            res.status(400).send({ error: 'USER_HAS_NO_ROLE' });
        }
    } catch (error) {
        console.log('Error in roleAuthorizerPost: ', error);
        res.status(400).send({ error: 'ERROR_IN_ROLE_AUTHORIZER' });
    }
}

module.exports = { roleAuthorizerGet, roleAuthorizerPost };
