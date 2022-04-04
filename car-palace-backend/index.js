const express = require('express');
const app = express();
app.use(express.json());
const carData = require('./carData');

const port = 3001;

app.use(express.json());

app.get('/search', (req, res) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.send(carData);
});

app.post('/sell', (req, res) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');

    const newCar = {
        ...req.body,
        id: carData.length+1
    };

    carData.push(newCar);
});

app.get('/modify/search/:id', (req, res) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');

    const car = carData.find((car) => car.id === parseInt(req.params.id));

    if(!car) {
        res.status(404).send('A keresett azonosító nem szerepel az adatbázisban!');
    } else {
        const index = carData.indexOf(car);
        carData[index] = {
            ...car,
            ...req.body
        };
        res.status(200).send(carData[index]);
    }
})

app.put('/modify/:id', (req, res) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');

    const car = carData.find((car) => car.id === parseInt(req.params.id));

    if(!car) {
        res.status(404).send('A keresett azonosító nem szerepel az adatbázisban!');
    } else {
        const index = carData.indexOf(car);
        carData[index] = {
            ...car,
            ...req.body
        };
        res.status(200).send(carData[index]);
    }
});

app.delete('/modify/:id', (req, res) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');

    const car = carData.indexOf(req.params.id)

    if(!car) {
        res.status(404).send('A keresett azonosító nem szerepel az adatbázisban!')
    } else {
        const index = carData.indexOf(car);
        carData.splice(index,1);
        res.status(200).send('A törlés sikeres volt!');
    }
});

app.listen(port, () => console.log(`Listening on port ${port}...`));