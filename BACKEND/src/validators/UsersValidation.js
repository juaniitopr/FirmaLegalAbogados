import Joi from 'joi';

export const createUserSchema = Joi.object({
  numeroIdentificacion: Joi.string().pattern(/^\d{7,10}$/).required().messages({
    'string.pattern.base': 'El número de identificación debe tener entre 7 y 10 dígitos.',
    'any.required': 'El número de identificación es obligatorio.'
  }),
  nombres: Joi.string().min(3).required().messages({
    'string.min': 'El nombre debe tener al menos 3 caracteres.',
    'any.required': 'El nombre es obligatorio.'
  }),
  apellidos: Joi.string().min(3).required().messages({
    'string.min': 'El apellido debe tener al menos 3 caracteres.',
    'any.required': 'El apellido es obligatorio.'
  }),
  telefono: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
    'string.pattern.base': 'El teléfono debe tener 10 dígitos.',
    'any.required': 'El teléfono es obligatorio.'
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'El correo electrónico debe ser válido.',
    'any.required': 'El correo electrónico es obligatorio.'
  }),
  id_rol: Joi.number().required().messages({
    'any.required': 'El rol es obligatorio.',
    'number.base': 'El rol debe ser un número válido.',
  }),
});

export const updateUserSchema = Joi.object({
  numeroIdentificacion: Joi.string().pattern(/^\d{7,10}$/).optional().messages({
    'string.pattern.base': 'El número de identificación debe tener entre 7 y 10 dígitos.',
  }),
  nombres: Joi.string().min(3).optional().messages({
    'string.min': 'El nombre debe tener al menos 3 caracteres.',
  }),
  apellidos: Joi.string().min(3).optional().messages({
    'string.min': 'El apellido debe tener al menos 3 caracteres.',
  }),
  telefono: Joi.string().pattern(/^[0-9]{10}$/).optional().messages({
    'string.pattern.base': 'El teléfono debe tener 10 dígitos.',
  }),
  email: Joi.string().email().optional().messages({
    'string.email': 'El correo electrónico debe ser válido.',
  }),
  password: Joi.string().min(6).optional().messages({
    'string.min': 'La contraseña debe tener al menos 6 caracteres.',
  }),
  id_rol: Joi.number().required().messages({
    'any.required': 'El rol es obligatorio.',
    'number.base': 'El rol debe ser un número válido.',
  }),
});

export const getUserSchema = Joi.object({
  numeroIdentificacion: Joi.string().pattern(/^\d{7,10}$/).required().messages({
    'string.pattern.base': 'El número de identificación debe tener entre 7 y 10 dígitos.',
    'any.required': 'El número de identificación es obligatorio.'
  }),
});

export const deleteUserSchema = Joi.object({
  numeroIdentificacion: Joi.string().pattern(/^\d{7,10}$/).required().messages({
    'string.pattern.base': 'El número de identificación debe tener entre 7 y 10 dígitos.',
    'any.required': 'El número de identificación es obligatorio.'
  }),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'El correo electrónico debe ser válido.',
    'any.required': 'El correo electrónico es obligatorio.'
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'La contraseña debe tener al menos 6 caracteres.',
    'any.required': 'La contraseña es obligatoria.'
  }),
});
