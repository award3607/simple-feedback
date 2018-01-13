module.exports = function(sequelize, DataTypes) {
    var Feedback = sequelize.define('feedback', {
        helpful: DataTypes.BOOLEAN,
        comment: DataTypes.STRING,
        inaccurate: DataTypes.BOOLEAN,
        outdated: DataTypes.BOOLEAN,
        badSearchResult: DataTypes.BOOLEAN,
        unclear: DataTypes.BOOLEAN,
        url: DataTypes.STRING,
        pageTitle: DataTypes.STRING,
        jiraSent: DataTypes.BOOLEAN,
        jiraSentBy: DataTypes.STRING,
        jiraSentTimestamp: DataTypes.DATE
    });
    return Feedback;
};