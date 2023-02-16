const User = require("../models/user");
const TokenGenerator = require("../models/token_generator");


const UsersController = {
  Create: (req, res) => {
    const user = new User(req.body);
    user.save((err) => {
      if (err) {
        // if account already exists
        res.status(400).json({message: 'Bad request'})
      } else {
        // account does not already exist
        res.status(201).json({ message: 'OK' });
      }
    });
  },
  Info: (req, res) => {
    User.findOne({ user: req.body.email }, (err, user) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      }
      if (!user) {
        res.status(404).json({ message: 'User not found' });
      } else {
        const { email, firstName, surname } = user; // extract the required fields from user object
        res.status(200).json({ email, firstName, surname }); // send response with all the fields
      }
    });
  }
};

module.exports = UsersController;
