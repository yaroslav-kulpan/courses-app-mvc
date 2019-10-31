const Course = require('../../models/course');

module.exports = (app) => {
    app.get('/courses', async (req, res) => {
        const courses = await Course.find()
            .populate('userId', 'email name')
            .select('price title image');
        res.render('courses', {
            title: 'Courses',
            isCourses: true,
            courses,
        });
    });
};
