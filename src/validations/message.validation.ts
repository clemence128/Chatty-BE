import Joi from "joi"

export const sendMessage = Joi.object({
    content: Joi.string().required().messages({
        'string.base': 'Message must be a string',
        'any.required': 'Please providea  message'
    })
})