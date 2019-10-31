const home = require('./routes/home');
const addCourses = require('./routes/courses/addCourses');
const getAllCourses = require('./routes/courses/getAllCourses');
const getCourses = require('./routes/courses/getCourses');
const updateCourses = require('./routes/courses/updateCourses');
const deleteCourses = require('./routes/courses/deleteCourses');
const card = require('./routes/card/card');
const orders = require('./routes/orders');
const login = require('./routes/auth');

module.exports = (app) => {
    home(app);
    addCourses(app);
    getAllCourses(app);
    getCourses(app);
    updateCourses(app);
    deleteCourses(app);
    card(app);
    orders(app);
    login(app);
};
