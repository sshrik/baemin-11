var express = require('express');
const ssw = require('../middlewares/session.js');
var router = express.Router();

/* GET login page */
router.get('/', function(req, res, next) {
    if(ssw.sessionWork(req, res, "Login", ["Agreement", "Login", "Main", "InputPhone", "InputEmail"])) {
        res.redirect("/");
    }
    else {
        res.render("screens/Login");
    }
});

module.exports = router;
