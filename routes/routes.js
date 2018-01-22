var express = require('express');
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

router.get('/admin', feedbackController.feedback_admin);

router.get('/test', feedbackController.feedback_test);

//login
router.get('/login', userController.login_page);
 
router.post('/login', userController.login);

//create user

router.get('/user', userController.user_create_page);

router.post('/user', userController.user_api_create);

//logout

router.get('/logout', userController.logout);

//helpers
var isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
};

module.exports = router;