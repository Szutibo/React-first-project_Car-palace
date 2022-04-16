const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

const carData = [
    {
        brand: 'Audi',
        model: 'A3',
        firstRegistration: '2004-10-18',
        mileage: 260000,
        fuelType: 'dízel',
        performance: 125,
        cost: 1350000,
        condition: 'jó',
        advertText: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aut harum quam omnis facilis aliquam, repellat eveniet pariatur neque voluptates dolor.',
        advertTitle: 'Eladó Audi A3',
        image: 'audi-a3.jpg',
        id: 1,
    },
    {
        brand: 'Hyundai',
        model: 'Atos',
        firstRegistration: '1998-12-10',
        mileage: 180000,
        fuelType: 'benzin',
        performance: 65,
        cost: 700000,
        condition: 'bontásra',
        advertText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio aspernatur similique blanditiis officia earum sapiente.',
        advertTitle: 'Eladó Hyundai Atos',
        image: 'hyundai-atos.jpg',
        id: 2,
    },
    {
        brand: 'Kia',
        model: 'Picanto',
        firstRegistration: '2006-02-20',
        mileage: 170000,
        fuelType: 'benzin',
        performance: 75,
        cost: 980000,
        condition: 'megviselt',
        advertText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio aspernatur similique blanditiis officia earum sapiente.',
        advertTitle: 'Eladó Kia Picanto',
        image: 'kia-picanto.jpg',
        id: 3,
    },
    {
        brand: 'Lada',
        model: '1200',
        firstRegistration: '1980-06-07',
        mileage: 60000,
        fuelType: 'benzin',
        performance: 68,
        cost: 1550000,
        condition: 'hibátlan',
        advertText: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, veniam fuga eos corporis sunt alias enim quasi cupiditate. Pariatur eum eligendi veniam distinctio sed!',
        advertTitle: 'Eladó Lada 1200',
        image: 'lada-1200.jpg',
        id: 4,
    },
    {
        brand: 'Mercedes',
        model: 'G250',
        firstRegistration: '2014-03-09',
        mileage: 48000,
        fuelType: 'dízel',
        performance: 350,
        cost: 6500000,
        condition: 'hibátlan',
        advertText: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, veniam fuga eos corporis sunt alias enim quasi cupiditate. Pariatur eum eligendi veniam distinctio sed!',
        advertTitle: 'Eladó Mercedes G250',
        image: 'mercedes-g250.jpg',
        id: 5,
    },
    {
        brand: 'Range Rover',
        model: 'Evoque',
        firstRegistration: '2016-09-01',
        mileage: 120000,
        fuelType: 'hybrid',
        performance: 250,
        cost: 5400000,
        condition: 'jó',
        advertText: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, veniam fuga eos corporis sunt alias enim quasi cupiditate. Pariatur eum eligendi veniam distinctio sed!',
        advertTitle: 'Eladó Range Rover Evoque',
        image: 'rangerover-evoque.jpg',
        id: 6,
    },
    {
        brand: 'Toyota',
        model: 'Highlander',
        firstRegistration: '2009-04-08',
        mileage: 156000,
        fuelType: 'hybrid',
        performance: 236,
        cost: 4750000,
        condition: 'jó',
        advertText: 'Lorem ipsum dolor sit amet consectetur. Ratione, veniam fuga eos enim quasi cupiditate. Pariatur eum eligendi veniam distinctio sed!',
        advertTitle: 'Eladó Toyota Highlander',
        image: 'toyota-highlander.jpg',
        id: 7,
    },
    {
        brand: 'Toyota',
        model: 'Supra',
        firstRegistration: '2018-09-30',
        mileage: 25000,
        fuelType: 'elektromos',
        performance: 420,
        cost: 9800000,
        condition: 'hibátlan',
        advertText: 'Lorem ipsum dolor sit amet. Ratione, veniam fuga eos corporis sunt alias enim. Pariatur eum eligendi veniam distinctio sed!',
        advertTitle: 'Eladó Toyota Supra',
        image: 'toyota-supra.jpg',
        id: 8,
    },
];

const port = 3001;

// Modify endpointok
app.get('/search/:id', (req, res) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');

    const car = carExists({ id: req.params.id, res });

    res.status(200).send(car);
});

app.delete('/modify/:id', (req, res) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');

    const car = carData.find((car) => car.id === parseInt(req.params.id));

    if (!car) {
        res.status(404).send('A keresett azonosító nem szerepel az adatbázisban!')
    } else {
        const index = carData.indexOf(car);
        carData.splice(index, 1);
        res.status(200).send('A törlés sikeres volt!');
    }
});

app.put('/modify/:id', (req, res) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');

    checkDetailsOfRequest({ req, res });
    const car = carData.find((car) => car.id === parseInt(req.params.id));

    const index = carData.indexOf(car);
        carData[index] =
        {
            ...car,
            ...req.body
        };
        res.status(200).send(carData[index]);
});

// Search endpoint
app.get('/search', (req, res) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.status(200).send(carData);
});

// Sell endpoint
app.post('/sell', (req, res) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');

    checkDetailsOfRequest({ req, res });
    const newCar = {
        ...req.body,
        id: carData.length + 1
    };

    carData.push(newCar);

    res.status(200).send(`A hirdetés feladása sikeres volt! A hirdetés azonosítója: ${newCar.id}`);
});

// Utility functions:
// Létezik-e az adott id
function carExists({ id, res }) {
    const car = carData.find((car) => car.id === parseInt(id));

    if (!car) {
        res.status(404).send(`Nem szerepel ilyen azonosítóval jármű az adatbázisban: ${id}`);
    }

    return car;
};

// Fueltype és Condition adatok ellenőrzése PUT és POST request esetében
function checkDetailsOfRequest({ req, res }) {
    if (req.body?.fuelType) {
        const fuelTypeError =  isFuelTypeValueCorrect({ fuelType: req.body.fuelType });
        !fuelTypeError && res.status(400).send('Az üzemanyag típus csak [benzin, dízel, elektromos, hybrid] lehet!');
    }

    if (req.body?.condition) {
        const conditionError =  isConditionValueCorrect({ condition: req.body.condition });
        !conditionError && res.status(400).send('Az autó állapota csak [jó, hibátlan, bontásra, megviselt] lehet!');
    }

}

// Fueltype ellenőrzése
function isFuelTypeValueCorrect({ fuelType }) {
    const rightValues = ['benzin', 'dízel', 'elektromos', 'hybrid'];

    return rightValues.includes(fuelType);
}

// Condition ellenőrzése
function isConditionValueCorrect({ condition }) {
    const rightValues = ['jó', 'hibátlan', 'bontásra', 'megviselt'];

    return rightValues.includes(condition);
}

app.listen(port, () => console.log(`Listening on port ${port}...`));