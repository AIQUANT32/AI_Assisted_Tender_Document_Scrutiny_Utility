const authService = require("../service/auth.service");

exports.signup = async (req, res) => {
    try {
      const token = await authService.signup(req.body);
      res.status(201).json({ token });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  
  exports.login = async (req, res) => {
    try {
      const token = await authService.login(req.body);
      res.status(200).json({ token });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };