import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';


const TextInput = ({
    label, name, placeholder, type, inputClassNames, isRequired,
    errorText, customRegex, disableSpace,
    spellCheck, autoComplete, autoCorrect, autoCapitalize,
    onValidate
}) => {
    const [value, setValue] = React.useState('');
    const [labelState, setLabelState] = React.useState(false);
    const [errorState, setErrorState] = React.useState(false);


    const validateInput = (str) => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const spaceRegex = /^\S*$/;

        if(str.length < 1)
            return false;
        if(type === "email" && !emailRegex.test(String(str).toLowerCase()))
            return false;
        if(disableSpace && !spaceRegex.test(String(str).toLowerCase()))
            return false;
        if(customRegex && !new RegExp(customRegex, 'g').test(String(str).toLowerCase()))
            return false;
        //@todo more conditions can be added here later
        return true;
    };

    const handleFocus = (e) => {
        setLabelState(true);
        setErrorState(false);
    };

    const handleChange = (e) => {
        setValue(e.currentTarget.value);
        if(!validateInput(e.currentTarget.value))
        {
            if(typeof onValidate === "function")
                onValidate(false);
        } else {
            if(typeof onValidate === "function")
                onValidate(true);
        }
    };

    const handleBlur = (e) => {
        const val = e.currentTarget.value;
        if(!validateInput(val))
            setErrorState(true);
    };


    const id = `${name}-input`;

    return <div className="form-group">
        <label
            aria-hidden={false}
            className={value.length > 0 && labelState && !errorState ? 'font-weight-bold text-primary' : 'd-none'}
            htmlFor={id}
        >
            {label}
        </label>
        { errorState && value.length > 0 ?  <div className="small text-danger mb-1">{errorText ? errorText : `Please enter a valid ${String(label).toLowerCase()}.` }</div> : null }
        <input
            aria-label={label}
            id={id}
            name={name}
            placeholder={placeholder ? placeholder : label}
            spellCheck={spellCheck}
            autoComplete={autoComplete}
            autoCorrect={autoCorrect}
            autoCapitalize={autoCapitalize}
            type={type}
            className={classNames(
                'd-block form-control',
                errorState && value.length > 0 ? 'is-invalid' : null,
                inputClassNames
            )}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            value={value}
            required={isRequired}
            aria-required={isRequired}
        />
    </div>

};

TextInput.propTypes  = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    type: PropTypes.oneOf(["email", "password", "text"]),
    inputClassNames: PropTypes.string,
    customRegex: PropTypes.any,
    errorText: PropTypes.string,
    spellCheck: PropTypes.string,
    disableSpace: PropTypes.bool,
    autoComplete: PropTypes.oneOf(["off", "email", "password", "username"]),
    autoCorrect: PropTypes.oneOf(["off", "on"]),
    autoCapitalize: PropTypes.oneOf(["off", "on"]),
    onValidate: PropTypes.func
};

export default TextInput;