import * as Joi from 'joi';

export default Joi.object().keys({
  name: Joi.string().required().min(1).max(20).rule({ message: 'Name fault' }),
  lastname: Joi.string()
    .required()
    .min(1)
    .max(30)
    .rule({ message: 'Lastname fault' }),
  username: Joi.string()
    .required()
    .min(1)
    .max(30)
    .rule({ message: 'username fault' }),
  password: Joi.string()
    .required()
    .min(1)
    .max(30)
    .rule({ message: 'password fault' }),
});
