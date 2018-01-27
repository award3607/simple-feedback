var User = require('../models').user;

// exports.login_page = (req, res) => {
//     res.render('login');
// };

exports.user_create_page = (req, res) => {
    res.render('create-user');
};

// exports.login = (req, res) => {
//     console.log(`Login attempt from ${req.body.username}`);
//     res.render('login');
// };

// exports.user_api_create = (req, res) => {
//     console.log(req.body);
//     User.create(req.body)
//     .then(result => {
//         res.status(201).json(result);
//         res.redirect('/');
//     });
// };

exports.logout = (req, res) => {
    req.logout();
    res.redirect('/');
};
