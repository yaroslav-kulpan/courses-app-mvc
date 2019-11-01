const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const csrf = require('csurf');
const exhbs = require('express-handlebars');
const flesh = require('connect-flash');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongodb-session')(session);
const routes = require('./routes');
const varMidlleWares = require('./middlewares/variables');
const userMidlleWares = require('./middlewares/user');
const MONGODB_STORE_URI = 'mongodb://@localhost:27017/shop';
const app = express();
const hbs = exhbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
});

const store = new MongoStore({
    collection: 'sessions',
    uri: MONGODB_STORE_URI
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
    store,
}));

app.use(csrf());
app.use(flesh());
app.use(varMidlleWares);
app.use(userMidlleWares);

routes(app);

const PORT = process.env.PORT || 3000;

async function start() {
    try {
        // const url = 'mongodb+srv://yaroslav:3fhxm78vmHGXlV30@courses-kbbgx.mongodb.net/shop';
        await mongoose.connect(MONGODB_STORE_URI, {
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
