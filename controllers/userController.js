const User = require("../models/user");
module.exports = {
  addUser: (req, res, next) => {
    console.log(req.body);
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });

    newUser
      .save()
      .then(user => res.json(user))
      .catch(err => console.log(err));
  }
};
