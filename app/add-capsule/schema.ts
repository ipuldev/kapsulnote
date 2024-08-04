import Joi from "joi";

export const noteSchema = Joi.object({
    value: Joi.string().required()
})