const Course = require('../../models/course');

module.exports = (app) => {
    app.post('/card/add', async (req, res) => {
        const course = await Course.findById(req.body.id);
        await req.user.addToCart(course);
        res.redirect('/card');
    });

    app.delete('/card/remove/:id', async (req, res) => {
        const card = await Card.remove(req.params.id);
        res.status(200).json(card)
    });

    app.get('/card', async (req, res) => {
        const card = await Card.fetch();
        res.render('card', {
            title: 'Shopping Card',
            isCard: true,
            courses: card.courses,
            price: card.price,
        });
    });
};

