import React from 'react'

const InputComponent = ({onInputChange, id}) => {
    return (
        <input
        value={id}
        className='searchField mb-3'
        placeholder='Kérem adja meg a keresett hirdetés azonosítóját!'
        onChange={(e) => onInputChange(e.target.value)} />
    );
};

export default InputComponent;