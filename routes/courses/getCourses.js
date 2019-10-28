const Course = require('../../models/course');

module.exports = (app) => {
    app.get('/:id', async (req, res) => {
        const {id} = req.params;
        const course = await Course.findById(id);
        res.render('course', {
            title: `Course ${course.title}`,
            course,
        });
    });
};
