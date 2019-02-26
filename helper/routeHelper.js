const Joi = require("Joi");
//usable code
module.exports = {
  validateParam: (schema, name) => {
    //added the name of the params as argument for more than one param
    return (req, res, next) => {
      const result = Joi.validate({ param: req["params"][name] }, schema);
      if (result.error) {
        //error during validation
        return res.status(400).json(result.error);
      } else {
        if (!req.value) req.value = {}; //req:{ value:{}}
        if (!req.value["params"]) req.value["params"] = {}; //req:{ value:{param:{}}}

        req.value["params"][name] = result.value.param; //req:{ value:{param:{result.value.param}}}
        next();
      }
    };
  },

  validateBody: schema => {
    return (req, res, next) => {
      const result = Joi.validate(req.body, schema);

      if (result.error) {
        return res.status(400).json(result.error);
      } else {
        if (!req.value) req.value = {};
        if (!req.value["body"]) req.value["body"] = {};

        req.value["body"] = result.value;
        next();
      }
    };
  },

  schemas: {
    userSchema: Joi.object().keys({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string()
        .email()
        .required()
    }),
    // for PATCH and not require every field
    userOptionalSchema: Joi.object().keys({
      firstName: Joi.string(),
      lastName: Joi.string(),
      email: Joi.string().email()
    }),
    userCarSchema: Joi.object().keys({
      make: Joi.string().required(),
      model: Joi.string().required(),
      year: Joi.number().required()
    }),
    carSchema: Joi.object().keys({
      seller: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required(),
      make: Joi.string().required(),
      model: Joi.string().required(),
      year: Joi.number().required()
    }),
    putCarSchema: Joi.object().keys({
      make: Joi.string().required(),
      model: Joi.string().required(),
      year: Joi.number().required()
    }),
    patchCarSchema: Joi.object().keys({
      make: Joi.string(),
      model: Joi.string(),
      year: Joi.number()
    }),

    idSchema: Joi.object().keys({
      param: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required()
    })
  }
};
