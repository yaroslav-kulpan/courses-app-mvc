const Course = require('../../models/course');

module.exports = (app) => {
    app.get('/add', (req, res) => {
        res.render('add', {
            title: 'Add courses',
            isAdd: true,
        });
    });

    app.post('/add', async (req, res) => {
        const course = new Course({
            title: req.body.title,
            price: req.body.price,
            image: req.body.image,
            userId: '5db729e3c1dd3f23fca5e49d',
        });

        try {
            await course.save();
            res.redirect('/courses');
        } catch (e) {
            console.log(e);
        }

    });
};
