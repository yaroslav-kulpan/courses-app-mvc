const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const exhbs = require('express-handlebars');
const mongoose = require('mongoose');
const session = require('express-session');
const routes = require('./routes');
const User = require('./models/user');
const varMidlleWares = require('./middlewares/variables');

const hbs = exhbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));

app.use(session({
    secret: 'some secret value',
    resave: false,
    saveUninitialized: false,
}));

app.use(varMidlleWares);

routes(app);

const PORT = process.env.PORT || 3000;

async function start() {
    try {
        // const url = 'mongodb+srv://yaroslav:3fhxm78vmHGXlV30@courses-kbbgx.mongodb.net/shop';
        const url = 'mongodb://@localhost:27017/shop';
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        app.listen(PORT, () => {
            console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
        });

    } catch (error) {
        console.error(error);
    }
}


start();
