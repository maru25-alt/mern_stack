const Joi = require('@hapi/joi');

const SignupSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(6).required(),
})

const SigninSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
})


module.exports = {
    signin: SigninSchema,
    signup: SignupSchema
};
