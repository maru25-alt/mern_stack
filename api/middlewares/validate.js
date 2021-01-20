import Joi from'@hapi/joi';

export const signup = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(6).required(),
    account: Joi.string().required(),
})

export const signin = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
    account: Joi.string().required(),
})


