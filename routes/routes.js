var express = require('express');
var passport = require('passport');
var feedbackController = require('../controllers/feedbackController.js');
var userController = require('../controllers/userController.js');

var router = express.Router();

//api
router.get('/api/all', feedbackController.feedback_api_all);

router.post('/api/create', feedbackController.feedback_api_create_post);

router.get('/api/:id', feedbackController.feedback_api_detail);

router.post('/api/delete', feedbackController.feedback_api_delete_post);

//html
router.get('/', (req, res) => {
    res.render('index');
});

router.get('/admin', isLoggedIn, feedbackController.feedback_admin);

router.get('/test', isLoggedIn, feedbackController.feedback_test);

//login
// router.get('/login', userController.login_page);
 
router.post('/login', passport.authenticate('login', {
    successRedirect: '/admin',
    failureRedirect: '/'
    }
));

//create user

router.get('/user', isLoggedIn, userController.user_create_page);

router.post('/user', passport.authenticate('create-user', {
    successRedirect: '/admin',
    failureRedirect: '/user'
    }
));

//logout

router.get('/logout', userController.logout);

//helpers
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

module.exports = router;