import Joi from "joi"

export const sendMessage = Joi.object({
    content: Joi.string().required().messages({
        'string.base': 'Message must be a string',
        'any.required': 'Please providea  message'
    })
})

export const sendMessageWithFiles = Joi.object({
    content: Joi.string(),
    files: Joi.array().items({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().required(),
        destination: Joi.string(),
        filename: Joi.string(),
        path: Joi.string(),
        size: Joi.number(),
    })
}).or("content", "files").required().messages({
    "object.missing": "Please provide message or file"
})