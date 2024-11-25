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
                user_id: user[0].user_id,
                user_name: user[0].user_name,
                user_email: user[0].user_email,
                user_birthdate: user[0].user_birthdate,
                user_gender: user[0].user_gender,
            },
        };
    } catch (err) {
        return { isValid: false };
    }
}

module.exports = validate;