const express = require('express');
const ssw = require('../middlewares/session.js');
const router = express.Router();

/* GET login page */
router.get('/', function(req, res, next) {
    if(ssw.sessionWork(req, res, "InputPhone", ["Agreement", "InputEmail"])) {
        res.redirect("/");
    }
    else {
        res.render("screens/InputPhone");
    }
});

module.exports = router;
