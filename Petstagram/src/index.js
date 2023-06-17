const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const routes = require('./routes');
const { auth }  = require('./middlewares/authMiddleware');


const app = express();

mongoose.connect(`mongodb://127.0.0.1:27017/petstagram`)
    .then(() => console.log("Db connected successfully"))
    .catch(err => console.log(err));

app.engine('hbs', handlebars.engine({
    extname: 'hbs'
}))

app.set('view engine', 'hbs');
app.set('views', 'src/views');

app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(auth);
app.use(routes);

app.listen(3000, console.log("Server is listening in port 3000"));
