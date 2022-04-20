export const getCars = async () => {
    const everyCar = await fetch('http://localhost:3001/search');
    return everyCar.json();
};

export const createAdvert = async (stateData) => {
    const { brand, model, fuelType, firstRegistration, condition, mileage, performance, cost, advertText, advertTitle, image } = stateData;
    const createdCar = await fetch('http://localhost:3001/sell', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            brand: brand,
            model: model,
            firstRegistration: firstRegistration,
            mileage: mileage,
            fuelType: fuelType,
            performance: performance,
            cost: cost,
            condition: condition,
            advertTitle: advertTitle,
            advertText: advertText,
            image: image
        })
    });
    if (createdCar.status === 200) {
        return createdCar.json();
    } else {
        throw new Error(
            `HTTP hiba történt: státuszkód ${createdCar.status}`
        );
    }
};

export const fetchCarById = async (id) => {
    const oneCar = await fetch(`http://localhost:3001/search/${id}`);
    if (oneCar.status === 200) {
        return oneCar.json();
    } else {
        throw new Error(
            'A keresett azonosító nem szerepel az adatbázisban!'
        );
    }
};

export const deleteCarById = (id) => {
    fetch(`http://localhost:3001/modify/${id}`, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: [],
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(
                    `HTTP hiba történt: státuszkód ${response.status}`
                );
            }
            return response;
        });
};

export const modifyCarById = async (id, data) => {
    const modifiedCar = await fetch(`http://localhost:3001/modify/${id}`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    });
    if (modifiedCar.status === 200) {
        return modifiedCar.json();
    } else {
        throw new Error(
            'A keresett azonosító nem szerepel az adatbázisban!'
        );
    }
};