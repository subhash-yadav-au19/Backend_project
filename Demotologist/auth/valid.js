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
            .required(),
    })
    return loginSchema.validate(data);
}



exports.booking_valid = (data) => {

    const bookingSchema = Joi.object({
        name: Joi.string()
            .alphanum()
            .min(5)
            .max(255)
            .required(),

        email: Joi.string()
            .email()
            .required(),

        phone: Joi.string()
            .min(10)
            .max(10)
            .required(),

        city:Joi.string()
        .required(),

        state:Joi.string()
        .required(),

        date:Joi.string()
        .required(),

        message:Joi.string()
        .required()
        
    })
    return bookingSchema.validate(data);
}