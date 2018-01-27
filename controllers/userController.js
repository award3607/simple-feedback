var User = require('../models').user;

exports.user_create_page = (req, res) => {
    res.render('create-user');
};

exports.logout = (req, res) => {
    req.logout();
    res.redirect('/');
};
