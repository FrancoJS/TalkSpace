import Joi from 'joi';

const registerValidator = Joi.object({
	username: Joi.string().min(3).max(30).required().messages({
		'string.empty': 'El nombre de usuario no puede estar vacio',
		'any.required': 'El nombre de usuario es requerido',
		'string.min': 'El nombre de usuario debe tener al menos 3 caracteres',
		'string.max': 'El nombre de usuario debe tener 30 caracteres como maximo',
	}),
	email: Joi.string().email().max(100).required().messages({
		'string.empty': 'El correo no puede estar vacio',
		'any.required': 'El correo es requerido',
		'string.email': 'El correo no es valido',
		'string.max': 'El correo debe tener 100 caracteres como maximo',
	}),
	password: Joi.string().required().messages({
		'string.empty': 'La contraseña no puede estar vacia',
		'any.required': 'La contraseña es requerida',
	}),
});

const loginValidator = Joi.object({
	email: Joi.string().email().max(100).required().messages({
		'string.empty': 'El correo no puede estar vacio',
		'any.required': 'El correo es requerido',
		'string.email': 'El correo no es valido',
		'string.max': 'El correo debe tener 100 caracteres como maximo',
	}),
	password: Joi.string().min(8).required().messages({
		'string.empty': 'La contraseña no puede estar vacia',
		'any.required': 'La contraseña es requerida',
		'string.min': 'La contraseña debe tener al menos 8 caracteres',
	}),
});

const userNameValidator = Joi.object({
	username: Joi.string().min(3).max(30).required().messages({
		'string.empty': 'El nombre de usuario no puede estar vacio',
		'any.required': 'El nombre de usuario es requerido',
		'string.min': 'El nombre de usuario debe tener al menos 3 caracteres',
		'string.max': 'El nombre de usuario debe tener 30 caracteres como maximo',
	}),
});

export { registerValidator, loginValidator, userNameValidator };
