import React from 'react';
import './Form.scss'

const Form = ({value, onChange, onCreate, onKeyPress}) => {
    return (
        <div className='form'>
            <div className='create-button'  onClick={onCreate}>
            +
            </div>
            <input className= 'input-box' value={value} onChange={onChange} onKeyPress={onKeyPress}/>
        </div>
        );
    };

export default Form;