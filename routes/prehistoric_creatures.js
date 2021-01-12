const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', (req, res) => {
    let creatures = fs.readFileSync('./creatures.json');
    let creatureData = JSON.parse(creatures)
    console.log(creatureData);
    res.render('creatures/creaturesIndex', { creatures: creatureData })
});

router.get('/new', (req, res) => {
    console.log('--------- New creature who dis?');
    res.render('creatures/newPre');
});

router.get('/1', (req, res) => {
    console.log('HELLO NEW CREATURES');
    res.render('creatures/creatures1');
});

router.get('/2', (req, res) => {
    res.render('creatures/creatures2');
});

router.get('/3', (req, res) => {
    res.render('creatures/creatures3');
});

router.get('/4' , (req, res) => {
    res.render('creatures/creatures4');
});


router.post('/', (req, res) => {
    console.log(req.body);
    // turn dinos.json into a mutable array
    let creatures = fs.readFileSync('./creatures.json')
    creaturesJS = JSON.parse(creatures);

    //add new dino from req.body to the array
    creaturesJS.push(req.body);

    // turn dino array into json
    let  creaturesJSON = JSON.stringify(creaturesJS);

    // write to dinos.json
    fs.writeFileSync('./creatures.json', creaturesJSON);

    res.redirect('/prehistoric_creatures');
})

module.exports = router;