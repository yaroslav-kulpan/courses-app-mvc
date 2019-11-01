const Course = require('../../models/course');
const auth = require('../../middlewares/auth');

module.exports = (app) => {
    app.post('/courses/remove', auth, async (req, res) => {
        try {
            await Course.deleteOne({ _id: req.body.id });
            res.redirect('/courses');
        } catch (error) {
            console.log(error);
        }
    });
};
