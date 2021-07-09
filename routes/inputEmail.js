const express = require('express');
const ssw = require('../middlewares/session.js');
const router = express.Router();

/* GET login page */
router.get('/', function(req, res, next) {
    if(ssw.sessionWork(req, res, "InputEmail", ["InputPhone"])) {
        res.redirect("/");
    }
    else {
        res.render("screens/InputEmail");
    }
});

module.exports = router;
