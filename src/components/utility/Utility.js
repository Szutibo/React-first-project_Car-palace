export function validateSell(values) {
    const { brand, model, fuelType, firstRegistration, condition, mileage, performance, cost, advertText, advertTitle, image } = values;
    const errors = [];
    const regexForDateFormat = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
    const regexUrlFormat = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)/;
    const regexNumberFormat = /^\d+$/;

    if (!brand) {
        errors.brand = 'Kérem adja meg a jármű márkáját!'
    } else if (brand.length > 30) {
        errors.brand = 'A gépjármű márkája nem lehet hosszabb 30 karakternél!'
    }

    if (!model) {
        errors.model = 'Kérem adja meg a jármű típusát!'
    } else if (model.length > 40) {
        errors.model = 'A gépjármű típusa nem lehet hosszabb 40 karakternél!'
    }

    if (!firstRegistration) {
        errors.firstRegistration = 'Kérem adja meg a jármű első forgalomba helyezését!'
    } else if (!regexForDateFormat.test(firstRegistration)) {
        errors.firstRegistration = 'Nem megfelelő dátum!'
    }

    if (!mileage) {
        errors.mileage = 'Kérem adja meg a jármű futásteljesítményét!'
    } else if (mileage > 1500000) {
        errors.mileage = 'A jármű futásteljesítménye nem lehet nagyobb, mint 1,5millió km!'
    } else if (!regexNumberFormat.test(mileage)) {
        errors.mileage = 'Csak egész szám adható meg!'
    }

    if (fuelType === '') {
        errors.fuelType = 'Kérem adja meg az üzemanyag típusát!'
    }

    if (!performance) {
        errors.performance = 'Kérem adja meg a jármű teljesítményét!'
    } else if (performance > 2500) {
        errors.performance = 'A gépjármű teljesítménye nem lehet több, mint 2500 le!'
    } else if (!regexNumberFormat.test(performance)) {
        errors.performance = 'Csak egész szám adható meg!'
    }

    if (!cost) {
        errors.cost = 'Kérem adja meg a jármű árát!'
    } else if (cost.length > 9) {
        errors.cost = 'A vételár maximum 9 számjegyű lehet!'
    } else if (cost.length < 5) {
        errors.cost = 'A vételárnak minimum 5 számjegyűnek kell lennie!'
    } else if (!regexNumberFormat.test(cost)) {
        errors.cost = 'Csak egész szám adható meg!'
    }

    if (condition === '') {
        errors.condition = 'Kérem adja meg a jármű állapotát!'
    }

    if (!advertTitle) {
        errors.advertTitle = 'Kérem adja meg a hirdetés címét!'
    } else if (advertTitle.length > 100) {
        errors.advertTitle = 'A hirdetés címe nem lehet hosszabb, mint 100 karakter!'
    }

    if (!image) {
        errors.image = 'Kérem adja meg a kép URL-jét!'
    } else if (!regexUrlFormat.test(image)) {
        errors.image = 'Nem megfelelő URL formátum!'
    }

    if (!advertText) {
        errors.advertText = 'Kérem adja meg a hirdetés szövegét!'
    } else if (advertText.length > 150) {
        errors.advertText = 'A hirdetés szövege nem lehet több, mint 150 karakter!'
    }

    return errors;
};

export const validateModify = (values) => {
    const { id, brand, model, firstRegistration, mileage, performance, cost, advertText, advertTitle, image } = values;
    const errors = [];
    const regexForDateFormat = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
    const regexUrlFormat = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)/;
    const regexNumberFormat = /^\d+$/;

    if (!regexNumberFormat.test(id)) {
        errors.id = 'Kérem csak pozitív egész számokat adjon meg azonosítóként!'
    }

    if (brand) {
        values.brand.length > 30 && (errors.brand = 'A gépjármű márkája nem lehet hosszabb 30 karakternél!');
    }

    if (model) {
        values.model.length > 40 && (errors.model = 'A gépjármű típusa nem lehet hosszabb 40 karakternél!');
    }

    if (firstRegistration) {
        !regexForDateFormat.test(values.firstRegistration) && (errors.firstRegistration = 'Nem megfelelő dátum!');
    }

    if (mileage) {
        values.mileage > 1500000 && (errors.mileage = 'A jármű futásteljesítménye nem lehet nagyobb, mint 1,5millió km!');
        !regexNumberFormat.test(values.mileage) && (errors.mileage = 'Csak pozitív egész szám adható meg!');
    }

    if (performance) {
        values.performance > 2500 && (errors.performance = 'A gépjármű teljesítménye nem lehet több, mint 2500 le!');
        !regexNumberFormat.test(values.performance) && (errors.performance = 'Csak pozitív egész szám adható meg!');
    }

    if (cost) {
        values.cost.length > 9 && (errors.cost = 'A vételár maximum 9 számjegyű lehet!');
        values.cost.length < 5 && (errors.cost = 'A vételárnak minimum 5 számjegyűnek kell lennie!');
        !regexNumberFormat.test(values.cost) && (errors.cost = 'Csak pozitív egész szám adható meg!');
    }

    if (advertTitle) {
        values.advertTitle.length > 100 && (errors.advertTitle = 'A hirdetés címe nem lehet hosszabb, mint 100 karakter!');
    }

    if (image) {
        !regexUrlFormat.test(values.image) && (errors.image = 'Nem megfelelő URL formátum!');
    }

    if (advertText) {
        values.advertText.length > 150 && (errors.advertText = 'A hirdetés szövege nem lehet több, mint 150 karakter!');
    }

    return errors;
};