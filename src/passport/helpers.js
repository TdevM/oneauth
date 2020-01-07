const passutils = require("../utils/password");
const models = require('../db/models').models;


const isValidOtpForUser = async (user, otp) => {
    return models.UserMobileOTP.findOne({
        where: {
            mobile_number: user.get().mobile_number,
            used_at: null
        },
        order: [['createdAt', 'DESC']]
    }).then((lastLoginOTP) => {
        if (!lastLoginOTP) {
            return false
        }
        if (lastLoginOTP.get('login_otp') === otp && !new Date(lastLoginOTP.dataValues.createdAt).getTime() < (new Date().getTime() - 10 * 60 * 1000)) {
            return lastLoginOTP.update({
                used_at: new Date()
            }).then(() => {
                return true
            })
        } else {
            return false
        }
    }).catch((err) => {
        return false
    })
}

const isValidPasswordForUser = async (user, password) => {
    return await passutils.compare2hash(password, user.password)
}

module.exports = {
    isValidOtpForUser, isValidPasswordForUser
}
