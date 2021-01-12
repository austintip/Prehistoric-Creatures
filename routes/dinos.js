const express = require('express');
const router = express.Router();
const fs = require('fs');

//index
router.get('/', (req, res) => {
    //read the file that stores all my dinos and save in a variable to use later
    let dinos = fs.readFileSync('./dinos.json');
    let dinoData = JSON.parse(dinos)
    console.log(dinoData);
    var nameFilter = req.query.nameFilter;
    if (nameFilter) {
        dinoData = dinoData.filter(function(dino) {
            return dino.name.toLowerCase() === nameFilter.toLowerCase();
        });
    };
    res.render('dinos/index', { dinos: dinoData })
});

// New route - /dinos/new
router.get('/new', (req, res) => {
    console.log('--------- New dino who dis?');
    res.render('dinos/new');
});


// Create - POST /dinos
router.post('/', (req, res) => {
    console.log(req.body);
    // turn dinos.json into a mutable array
    let dinos = fs.readFileSync('./dinos.json')
    dinosJS = JSON.parse(dinos);

    //add new dino from req.body to the array
    dinosJS.push(req.body);

    // turn dino array into json
    let dinoJSON = JSON.stringify(dinosJS);

    // write to dinos.json
    fs.writeFileSync('./dinos.json', dinoJSON);

    res.redirect('/dinos');
});

module.exports = router;