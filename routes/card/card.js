const Course = require('../../models/course');

module.exports = (app) => {
    function mapCartItems(cart) {
        return cart.items.map((items) => ({
            ...items.courseId._doc,
            id: items.courseId.id,
            counter: items.counter
        }))
    }

    function computePrice(courses) {
        return courses.reduce((total, course) => {
            return total += course.price * course.counter;
        }, 0)
    }

    app.post('/card/add', async (req, res) => {
        const course = await Course.findById(req.body.id);
        await req.user.addToCart(course);
        res.redirect('/card');
    });

    app.delete('/card/remove/:id', async (req, res) => {
        await req.user.removeFromCart(req.params.id);
        const user = await req.user.populate('cart.items.courseId').execPopulate();
        const courses = mapCartItems(user.cart);
        const cart = {
            courses,
            price: computePrice(courses),
        };

        res.status(200).json(cart);
    });

    app.get('/card', async (req, res) => {
        const user = await req.user.populate('cart.items.courseId').execPopulate();

        const courses = mapCartItems(user.cart);

        res.render('card', {
            title: 'Shopping Card',
            isCard: true,
            courses: courses,
            price: computePrice(courses),
        });
    });
};

