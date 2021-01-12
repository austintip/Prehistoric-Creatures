const express = require('express');
const layouts = require('express-ejs-layouts');
const path = require('path');
const app = express();
app.use(express.urlencoded({ extended: false })); //Body parsing middleware

app.set('view engine', 'ejs');
app.use(layouts);
app.use(express.static(path.join(__dirname, '/static')));

app.get('/', (req, res) => {
    res.render('home');
});

app.use('/dinos', require('./routes/dinos'));

app.listen(8000, () => console.log('Hey, listen!'));