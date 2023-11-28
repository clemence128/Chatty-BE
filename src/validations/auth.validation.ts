import Joi from "joi";

const signUpValidator = Joi.object({
    name: Joi.string().required().messages({
        'string.base': 'Name must be a string',
        'any.required': 'Please provide your name'
    }),

    password: Joi.string().required().min(8).max(32).messages({
        'string.base': 'Password must be a string',
        'string.min': 'Password must be at least 8 characters',
        'string.max': 'Password must be at most 32 characters',
        'any.required': 'Please provide your password'
    }),

    email: Joi.string().required().email().messages({
        'string.base': 'Email must be a string',
        'string.email': 'Please provide a valid email',
        'any.required': 'Please provide your email'
    })
})

const signInValidator = Joi.object({
    password: Joi.string().required().min(8).max(32).messages({
        'string.base': 'Password must be a string',
        'string.min': 'Password must be at least 8 characters',
        'string.max': 'Password must be at most 32 characters',
        'any.required': 'Please provide your password'
    }),

    email: Joi.string().required().email().messages({
        'string.base': 'Email must be a string',
        'string.email': 'Please provide a valid email',
        'any.required': 'Please provide your email'
    })
})

const refreshTokenValidator = Joi.object({
    refreshToken: Joi.string().required().messages({      
        'any.required': 'Please provide refresh token'
    }),

})

export {signUpValidator, signInValidator, refreshTokenValidator}