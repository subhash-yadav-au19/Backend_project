const Joi = require('joi');

exports.reg_valid = (data) => {

    const registerSchema = Joi.object({
        username: Joi.string()
            .alphanum()
            .min(5)
            .max(255)
            .required(),

        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .required(),

        password: Joi.string()
            .min(5)
            .max(16)
            .required(),

        role:Joi.string()
        .alphanum()
        .default('member')
    })
    return registerSchema.validate(data);
}



exports.login_valid = (data) => {
    const loginSchema = Joi.object({

        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .required(),

        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
            .required(),
    })
    return loginSchema.validate(data);
}
