import React, { InputHTMLAttributes } from 'react';

import './style.css'

interface inputProps extends InputHTMLAttributes<HTMLInputElement> {
label?: string;
name: string;
placeholder?: string;
}


export const Input: React.FC<inputProps> = ({name, label, placeholder, ...rest}) => {
    return (
        <div className="input-todo">
            {name &&  <label htmlFor={name}>{label}</label> }
            <input id={name} type="text" placeholder={placeholder} {...rest}/> 
        </div>
    )
}