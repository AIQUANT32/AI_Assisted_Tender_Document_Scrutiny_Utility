const router = require("express").Router();
const Controller = require("../controller/auth.controller");


router.post('/signup', Controller.signup);
router.post('/login', Controller.login);

module.exports = router;