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

router.get('/login', userController.login);

router.get('/user', userController.user_create);

module.exports = router;