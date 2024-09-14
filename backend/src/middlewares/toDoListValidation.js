import Joi from "joi"

export const toDoListValidator = (req,res,next) => {
    const schema = Joi.object({
    title: Joi.string().min(1).max(100).required(),
    description: Joi.string().min(1).max(200).required(),
    priority: Joi.string().valid('Priority 1', 'Priority 2', 'Priority 3', 'Priority 4').required(),
    isCompleted: Joi.boolean().default(false)
    })

    const {error} = schema.validate(req.body)
    if (error) {
        return res.status(400).json({
          message: "Bad Request",
          error: error
        });
      }
      next();
    };


export const updateToDoListValidator = (req,res,next) => {
    const schema = Joi.object({
        title: Joi.string().min(1).max(100),
        description: Joi.string().min(1).max(200),
        priority: Joi.string().valid('Priority 1', 'Priority 2', 'Priority 3', 'Priority 4'),
        isCompleted: Joi.boolean().default(false)
    })

    const {error} = schema.validate(req.body);
    if(error){
        return res.status(500).json({
            message : "Bad Request",
            Error : error
        });
    }
    next();
}    