const home = require('./routes/home');
const addCourses = require('./routes/courses/addCourses');
const getAllCourses = require('./routes/courses/getAllCourses');
const getCourses = require('./routes/courses/getCourses');
const editCourses = require('./routes/courses/editCourses');
const deleteCourses = require('./routes/courses/deleteCourses');


module.exports = (app) => {
    home(app);
    addCourses(app);
    getAllCourses(app);
    getCourses(app);
    editCourses(app);
    deleteCourses(app);
};
