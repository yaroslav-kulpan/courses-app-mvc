const Course = require('../../models/course');
const auth = require('../../middlewares/auth');

module.exports = (app) => {
    app.get('/courses/:id/edit', auth, async (req, res) => {
        if (!req.query.allow) {
            return res.redirect('/');
        }
        const {id} = req.params;
        const course = await Course.findById(id);
        res.render('course-edit', {
            title: `Course ${course.title}`,
            course,
        });
    });

    app.post('/courses/edit', auth, async (req, res) => {
        const {id} = req.body;
        delete req.body.id;
        await Course.findByIdAndUpdate(id, req.body);
        res.redirect('/courses');
    });
};
