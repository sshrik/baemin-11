var express = require('express');
var router = express.Router();

/* GET login page */
router.get('/', function(req, res, next) {
    res.render("screens/login");
});

const signUpApi = require("../api/signUp.js");

router.post('/checkDuplicate', function(req, res, next) {
    if(signUpApi(req.body.id)) {
        // 중복에 관련된 로직 실행.
        res.send("DENY");
    }
});

module.exports = router;
