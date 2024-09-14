import Joi from "joi";

export const registerValidation = (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string().min(3).max(100).required(),
    middleName: Joi.string().min(3).max(100),
    lastName: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    address: Joi.string().min(3).max(200).required(),
    phoneNumber: Joi.number().min(1000000000).max(9999999999).required(),
    age: Joi.number().min(10).max(90).required(),
    gender: Joi.string().valid('Male', 'Female', 'Other').required(),
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: "Bad Request",
      error,
    });
  }
  next();
};

export const loginValidator = (req,res,next) => {
    const schema = Joi.object({
        email : Joi.string().email().required(),
        password : Joi.string().min(6).required()
    })

    const {error} = schema.validate(req.body);
    if(error){
        return res.status(400).json({
            message: "Bad Request",
            error
        })
    }
    next();
}

export const updateProfileValidator = (req,res,next) => {
    const schema = Joi.object({
        firstName: Joi.string().min(3).max(100),
    middleName: Joi.string().min(3).max(100),
    lastName: Joi.string().min(3).max(100),
    email: Joi.string().email(),
    address: Joi.string().min(3).max(200),
    phoneNumber: Joi.number().min(1000000000).max(9999999999),
    age: Joi.number().min(10).max(90),
    gender: Joi.string().valid('Male', 'Female', 'Other')
    })

    const {error} = schema.validate(req.body);
    if(error) {
        return res.status(400).json({
            message : "Bad Request",
            error
        })
    }

    next();
}