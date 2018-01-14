var User = require('../models/user.js');

exports.login = (req, res) => {
    res.render('login');
}

exports.user_create = (req, res) => {
    res.render('create-user');
}