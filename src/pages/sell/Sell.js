import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

// MUI imports
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@material-ui/styles';
import InputAdornment from '@mui/material/InputAdornment';

// CSS-re kiváltani
const useStyles = makeStyles({
  field: {
    '&&': {
      marginTop: 20,
      marginBottom: 20,
    }
  }
});

const Sell = () => {
  const [stateData, setStateData] = useState({
    brand: '',
    model: '',
    firstRegistration: '',
    mileage: '',
    fuelType: '',
    performance: '',
    cost: '',
    condition: '',
    advertText: '',
    advertTitle: '',
    image: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const classes = useStyles();

  const createAdvert = () => {
    fetch('http://localhost:3001/sell', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        brand: stateData.brand,
        model: stateData.model,
        firstRegistration: stateData.firstRegistration,
        mileage: stateData.mileage,
        fuelType: stateData.fuelType,
        performance: stateData.performance,
        cost: stateData.cost,
        condition: stateData.condition,
        advertTitle: stateData.advertTitle,
        advertText: stateData.advertText,
        image: stateData.image
      })
    })
      .then(alert('Sikeres hirdetésfeladás!'))
      .catch(error => console.log(`error: ${error}`))
  }

  const submitButtonChecker = () => {
    Object.keys(formErrors).length === 0 ? setButtonDisabled(false) : setButtonDisabled(true)
  }

  useEffect(() => {
    setFormErrors(validate(stateData));
  }, [stateData])

  const validate = (values) => {
    const errors = {};
    const regexForDateFormat = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
    const regexUrlFormat = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)/;
    const regexNumberFormat = /^\d+$/;

    if (!values.brand) {
      errors.brand = 'Kérem adja meg a jármű márkáját!'
    } else if (values.brand.length > 30) {
      errors.brand = 'A gépjármű márkája nem lehet hosszabb 30 karakternél!'
    }

    if (!values.model) {
      errors.model = 'Kérem adja meg a jármű típusát!'
    } else if (values.model.length > 40) {
      errors.model = 'A gépjármű típusa nem lehet hosszabb 40 karakternél!'
    }

    if (!values.firstRegistration) {
      errors.firstRegistration = 'Kérem adja meg a jármű első forgalomba helyezését!'
    } else if (!regexForDateFormat.test(values.firstRegistration)) {
      errors.firstRegistration = 'Nem megfelelő dátum!'
    }

    if (!values.mileage) {
      errors.mileage = 'Kérem adja meg a jármű futásteljesítményét!'
    } else if (values.mileage > 1500000) {
      errors.mileage = 'A jármű futásteljesítménye nem lehet nagyobb, mint 1,5millió km!'
    } else if (values.mileage < 0) {
      errors.mileage = 'A futott km nem lehet negatív szám!'
    } else if (!regexNumberFormat.test(values.mileage)) {
      errors.mileage = 'Csak egész szám adható meg!'
    }

    if (values.fuelType === '') {
      errors.fuelType = 'Kérem adja meg az üzemanyag típusát!'
    }

    if (!values.performance) {
      errors.performance = 'Kérem adja meg a jármű teljesítményét!'
    } else if (values.performance > 2500) {
      errors.performance = 'A gépjármű teljesítménye nem lehet több, mint 2500 le!'
    } else if (values.performance < 0) {
      errors.performance = 'A gépjármű teljesítménye nem lehet negatív szám!'
    } else if (!regexNumberFormat.test(values.performance)) {
      errors.performance = 'Csak egész szám adható meg!'
    }

    if (!values.cost) {
      errors.cost = 'Kérem adja meg a jármű árát!'
    } else if (values.cost < 0) {
      errors.cost = 'A vételár nem lehet negatív szám!'
    } else if (values.cost.length > 9) {
      errors.cost = 'A vételár maximum 9 számjegyű lehet!'
    } else if (values.cost.length < 5) {
      errors.cost = 'A vételárnak minimum 5 számjegyűnek kell lennie!'
    } else if (!regexNumberFormat.test(values.cost)) {
      errors.cost = 'Csak egész szám adható meg!'
    }

    if (values.condition === '') {
      errors.condition = 'Kérem adja meg a jármű állapotát!'
    }

    if (!values.advertTitle) {
      errors.advertTitle = 'Kérem adja meg a hirdetés címét!'
    } else if (values.advertTitle.length > 100) {
      errors.advertTitle = 'A hirdetés címe nem lehet hosszabb, mint 100 karakter!'
    }

    if (!values.image) {
      errors.image = 'Kérem adja meg a kép URL-jét!'
    } else if (!regexUrlFormat.test(values.image)) {
      errors.image = 'Nem megfelelő URL formátum!'
    }

    if (!values.advertText) {
      errors.advertText = 'Kérem adja meg a hirdetés szövegét!'
    } else if (values.advertText.length > 150) {
      errors.advertText = 'A hirdetés szövege nem lehet több, mint 150 karakter!'
    }

    return errors;
  }

  return (
    <main>
      <div className='sellingBox'>
        <form
          noValidate
          autoComplete='off'
          onChange={() => submitButtonChecker()}
        >
          <h1>Hirdetés feladása</h1>
          <TextField
            className={classes.field}
            label="Márka"
            variant="outlined"
            onChange={(e) => setStateData({ ...stateData, brand: e.target.value })}
            size='small'
            required
            helperText={formErrors.brand}
            color='success'
          />
          <TextField
            className={classes.field}
            label="Modell"
            variant="outlined"
            onChange={(e) => setStateData({ ...stateData, model: e.target.value })}
            size='small'
            required
            helperText={formErrors.model}
            color='success'
          />
          <TextField
            className={classes.field}
            label="Évjárat"
            placeholder='YYYY-MM-DD'
            variant="outlined"
            onChange={(e) => setStateData({ ...stateData, firstRegistration: e.target.value })}
            size='small'
            required
            helperText={formErrors.firstRegistration}
            color='success'
          />
          <TextField
            className={classes.field}
            label="Futásteljesítmény"
            variant="outlined"
            onChange={(e) => setStateData({ ...stateData, mileage: e.target.value })}
            size='small'
            required
            helperText={formErrors.mileage}
            InputProps={{
              endAdornment: <InputAdornment position="end">km</InputAdornment>,
            }}
            color='success'
          />
          <Box className={classes.field} sx={{ minWidth: 120 }}>
            <FormControl sx={{ minWidth: 180 }} size='small'>
              <InputLabel>Üzemanyag típusa</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                value={stateData.fuelType}
                label="üzemanyag"
                onChange={(e) => setStateData({ ...stateData, fuelType: e.target.value })}
                color='success'
              >
                <MenuItem value='benzin'>benzin</MenuItem>
                <MenuItem value='dízel'>dízel</MenuItem>
                <MenuItem value='elektromos'>elektromos</MenuItem>
                <MenuItem value='hybrid'>hybrid</MenuItem>
              </Select>
              <p>{formErrors.fuelType}</p>
            </FormControl>
          </Box>
          <TextField
            className={classes.field}
            label="Teljesítmény"
            variant="outlined"
            onChange={(e) => setStateData({ ...stateData, performance: e.target.value })}
            size='small'
            required
            helperText={formErrors.performance}
            InputProps={{
              endAdornment: <InputAdornment position="end">le</InputAdornment>,
            }}
            color='success'
          />
          <TextField
            className={classes.field}
            label="Vételár"
            variant="outlined"
            onChange={(e) => setStateData({ ...stateData, cost: e.target.value })}
            size='small'
            required
            helperText={formErrors.cost}
            InputProps={{
              endAdornment: <InputAdornment position="end">huf</InputAdornment>,
            }}
            color='success'
          />
          <Box className={classes.field} sx={{ minWidth: 120 }}>
            <FormControl sx={{ minWidth: 180 }} size='small'>
              <InputLabel>Állapot</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                value={stateData.condition}
                label="állapot"
                onChange={(e) => setStateData({ ...stateData, condition: e.target.value })}
                color='success'
              >
                <MenuItem value='hibátlan'>hibátlan</MenuItem>
                <MenuItem value='jó'>jó</MenuItem>
                <MenuItem value='megviselt'>megviselt</MenuItem>
                <MenuItem value='bontásra'>bontásra</MenuItem>
              </Select>
              <p>{formErrors.condition}</p>
            </FormControl>
          </Box>
          <TextField
            className={classes.field}
            label="Hirdetés címe"
            variant="outlined"
            onChange={(e) => setStateData({ ...stateData, advertTitle: e.target.value })}
            size='small'
            required
            helperText={formErrors.advertTitle}
            color='success'
          />
          <TextField
            className={classes.field}
            label="Kép elérési útja"
            variant="outlined"
            onChange={(e) => setStateData({ ...stateData, image: e.target.value })}
            size='small'
            required
            helperText={formErrors.image}
            color='success'
          />
          <TextField
            className={classes.field}
            label='Hirdetés szövege'
            onChange={(e) => setStateData({ ...stateData, advertText: e.target.value })}
            size='small'
            multiline
            rows={2}
            required
            helperText={formErrors.advertText}
            color='success'
          />
          <Button
            disabled={buttonDisabled}
            type='submit'
            variant='success'
            className='searchBtn ms-3'
            onClick={createAdvert}
          >Hirdetés feladása</Button>
        </form>
      </div>
    </main>
  )
}

export default Sell