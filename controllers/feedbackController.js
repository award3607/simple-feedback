var Feedback = require('../models').feedback;

exports.feedback_admin = (req, res) => {
    Feedback.findAll({}).then(data => {
        res.render('admin', {data: data, user: req.user});
    });
};

exports.feedback_test = (req, res) => {
    res.render('test');
}

exports.feedback_api_all = (req, res) => {
    Feedback.findAll({}).then(data => {
        res.status(200).json(data);
    });
};

exports.feedback_api_detail = (req, res) => {
    Feedback.findById(req.params.id).then(data => {
        // console.log(data);
        res.status(200).json(data);
    });
};

exports.feedback_api_create_post = (req, res) => {
    // console.log(req.body);
    Feedback.create(req.body)
    .then(result => {
        res.status(201).json(result);
    });
};

exports.feedback_api_delete_post = (req, res) => {
    // console.log(req.body);
    Feedback.destroy({
        where: {
            id: req.body.feedbackId
        }
    }).then(result => {
        if (result > 0) {
            res.status(200).redirect('/admin');
        }
        else {
            res.status(404).redirect('/admin');
        }
    });
};