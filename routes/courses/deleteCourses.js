const Course = require('../../models/course');

module.exports = (app) => {
    app.post('/courses/remove', async (req, res) => {
        try {
            await Course.deleteOne({ _id: req.body.id });
            res.redirect('/courses');
        } catch (error) {
            console.log(error);
        }
    });
};
