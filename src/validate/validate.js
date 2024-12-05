const { getUserById } = require('../dbconfig/db.js');
require('dotenv').config();

const validate = async (decoded, request, h) => {
    try {
        const user = await getUserById(decoded.userId);
        if (!user || user.length === 0) {
            return { isValid: false };
        }
        return {
            isValid: true,
            credentials: {
                id: user[0].id,
                name: user[0].name,
                email: user[0].email,
                birthdate: user[0].birthdate,
                gender: user[0].gender,
            },
        };
    } catch (err) {
        return { isValid: false };
    }
}

module.exports = validate;