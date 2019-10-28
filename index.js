const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const exhbs = require('express-handlebars');
const mongoose = require('mongoose');
const routes = require('./routes');
const User = require('./models/user');

const hbs = exhbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(async (req, res, next) => {
    try {
        user = await user.findById('user id can network');
        req.user = user;
        next();
    } catch (error) {
        console.error(error);
    }
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
routes(app);

const PORT = process.env.PORT || 3000;

async function start() {
    try {
        const url = 'mongodb+srv://yaroslav:3fhxm78vmHGXlV30@courses-kbbgx.mongodb.net/shop';
        await mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

        const candidate = await User.findOne();
        if (!candidate) {
            const user = new User({
                email: 'wow1996strap@gmail.com',
                name: 'Yaroslav',
                cart: {items: []}
            });

            await user.save();
        }
        app.listen(PORT, () => {
            console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
        });

    } catch (error) {
        console.error(error);
    }
}

start();
