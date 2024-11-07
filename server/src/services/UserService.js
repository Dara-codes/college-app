const User = require('../models/User');



async function existsByEmail(email) {
    return await User.findOne({ email });
}


module.exports = {
    existsByEmail
}