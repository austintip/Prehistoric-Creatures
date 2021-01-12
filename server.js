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

app.use('/prehistoric_creatures', require('./routes/prehistoric_creatures'));

app.post('/dinos', function(req, res) {
    console.log(req.body);
});
//express show route for dinosaurs (lists one dinosaur)
app.get('/dinos/:idx', function(req, res) {
    // get dinosaurs
    var dinosaurs = fs.readFileSync('./dinos.json');
    var dinoData = JSON.parse(dinosaurs);
    //get array index from url parameter
    var dinoIndex = parseInt(req.params.idx);
    //render page with data of the specified animal
    res.render('dinos/show', {myDino: dinoData[dinoIndex]});
});
app.get('/dinos', function(req, res) {
    var dinosaurs = fs.readFileSync('./dinos.json');
    var dinoData = JSON.parse(dinosaurs);
    var nameFilter = req.query.nameFilter;
    if (nameFilter) {
        dinoData = dinoData.filter(function(dino) {
        return dino.name.toLowerCase() === nameFilter.toLowerCase();
    });
    }
    res.render('dinos/index', {dinos: dinoData});
});

app.listen(8000, () => console.log('Hey, listen!'));