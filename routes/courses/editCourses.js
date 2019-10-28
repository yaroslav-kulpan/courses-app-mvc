const Course = require('../../models/course');

module.exports = (app) => {
    app.get('/:id/edit', async (req, res) => {
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

    app.post('/edit', async (req, res) => {
        const {id} = req.body;
        delete req.body.id;
        await Course.findByIdAndUpdate(id, req.body);
        res.redirect('/courses');
    });
};
