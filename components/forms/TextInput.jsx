import React, {useState} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { emailValidator, containsSpace } from "../../data/regexValidators";

import "../../styles/forms/input.sass";

const TextInput = ({
    id, label, name, placeholder, type, value: val, inputClassName, className,
    isRequired = false, isDisabled = false, showLimit = true, hideLabel = false, minimal = false,
    errorText, customRegex, disableSpace, charLimit,
    rows, spellCheck, autoComplete, autoCorrect, autoCapitalize, autoFocus,
    onValidate, onChange,
}) => {
    const [value, setValue] = useState(val ? val : '');
    const [isTyping, setTyping] = useState(false);
    const [errorState, setErrorState] = useState(false);


    const validateInput = (str) => {

        if(str.length < 1)
            return false;
        if(type === "email" && !emailValidator.test(String(str).toLowerCase()))
            return false;
        if(disableSpace && !containsSpace.test(String(str).toLowerCase()))
            return false;
        if(customRegex && !new RegExp(customRegex, 'g').test(String(str).toLowerCase()))
            return false;
        //@todo more conditions can be added here later
        return true;
    };

    const handleChange = (e) => {
        if(typeof onChange === "function")
            onChange(e.currentTarget.value);
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

    const handleFocus = (e) => {
        setTyping(true);
        setErrorState(false);
    };

    const [wasBlured, setBlured] = useState(false);
    const handleBlur = (e) => {
        setBlured(true);
        setTyping(false);
        const val = e.currentTarget.value;
        if(!validateInput(val))
            setErrorState(true);
    };

    const inputID = `${name}-input`;

    return <div className={classNames("form-group mb-0", className)} >
        <div className="row m-0">
            <div className="col-8 p-1">
                <label
                    aria-hidden={false}
                    className={value.length > 0 && !errorState && !hideLabel ? 'font-weight-bold text-primary small' : 'd-none'}
                    htmlFor={id ? id : inputID}
                >
                    {label}
                </label>
            </div>
            {
                value.length > 0 && isTyping && charLimit && showLimit ?
                    <div className="col-4 d-flex align-items-end p-1">
                        <div className={
                            classNames(
                                value.length/charLimit > 0.8 ?
                                    'text-danger' :
                                    value.length/charLimit > 0.5 ?
                                        'text-warning'
                                : 'text-success',
                                'char-limit-warning p-0 small'
                            )
                        }>
                            {value.length}/{charLimit}
                        </div>
                    </div>: null
            }
        </div>
        { errorState && (value.length > 0 || isRequired) ?  <div className="small text-danger mb-1">{errorText ? errorText : `Please enter a valid ${String(label).toLowerCase()}.` }</div> : null }
        {
            type === "textarea" ?
                <textarea
                    aria-label={label}
                    placeholder={placeholder}
                    value={value}
                    disabled={isDisabled}
                    rows={rows}
                    className={classNames(
                        inputClassName,
                        'form-control text-input-field',
                        { 'minimal': minimal},
                    )}
                    maxLength={charLimit}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required={isRequired}
                    aria-required={isRequired}
                    autoFocus={autoFocus && !wasBlured}
                /> :
                <input
                    aria-label={label}
                    id={id ? id : inputID}
                    name={name}
                    placeholder={placeholder ? placeholder : label}
                    spellCheck={spellCheck}
                    autoComplete={autoComplete}
                    autoCorrect={autoCorrect}
                    autoCapitalize={autoCapitalize}
                    type={type}
                    className={classNames(
                        inputClassName,
                        'd-block form-control',
                        { 'is-invalid' : errorState && (value.length > 0 || isRequired) },
                        { 'minimal': minimal},
                    )}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={value}
                    required={isRequired}
                    aria-required={isRequired}
                    autoFocus={!!autoFocus && !wasBlured}
                />
        }
    </div>

};

TextInput.propTypes  = {
    id: PropTypes.string,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    type: PropTypes.oneOf(["email", "password", "text", "textarea", "url"]),
    value: PropTypes.string,
    charLimit: PropTypes.number,
    disableSpace: PropTypes.bool,
    isRequired: PropTypes.bool,
    isDisabled: PropTypes.bool,
    showLimit: PropTypes.bool,
    hideLabel: PropTypes.bool,
    className: PropTypes.string,
    inputClassName: PropTypes.string,
    customRegex: PropTypes.any,
    errorText: PropTypes.string,
    rows: PropTypes.number,
    spellCheck: PropTypes.string,
    autoFocus: PropTypes.bool,
    autoComplete: PropTypes.oneOf(["off", "email", "password", "username"]),
    autoCorrect: PropTypes.oneOf(["off", "on"]),
    autoCapitalize: PropTypes.oneOf(["off", "on"]),
    onValidate: PropTypes.func
};

export default TextInput;