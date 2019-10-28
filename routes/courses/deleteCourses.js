const Course = require('../../models/course');

module.exports = (app) => {
    app.post('/remove', async (req, res) => {
        try {
            await Course.deleteOne({ _id: req.body.id })
            res.redirect('/courses');
        } catch (error) {
            console.log(error);
        }
    });
};
