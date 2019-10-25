const {Router} = require('express');
const router = Router();
const Course = require('../models/course');

router.get('/', async (req, res) => {
    const courses = await Course.getAll();
    res.render('courses', {
        title: 'Courses',
        isCourses: true,
        courses,
    });
});

router.get('/:id', async (req, res) => {
    const {id} = req.params;
    const course = await Course.getById(id);
    res.render('course', {
        title: `Course ${course.title}`,
        course,
    });
});

router.get('/:id/edit', async (req, res) => {
    if (!req.query.allow) {
        return res.redirect('/');
    }

    const {id} = req.params;
    const course = await Course.getById(id);

    res.render('course-edit', {
        title: `Course ${course.title}`,
        course,
    });
});

router.post('/edit', async (req, res) => {
    await Course.update(req.body);
    res.redirect('/courses');
});

module.exports = router;
