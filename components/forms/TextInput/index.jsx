import React, { useState, createRef } from 'react';
import shortid from 'shortid';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { emailValidator, containsSpace } from "../../../data/regexValidators";

import "./style.sass";

import SuggestionSelector from "./SuggestionSelector";

const TextInput = ({
    id, label, name, placeholder, type, value: val, inputClassName, className,
    isRequired = false, isDisabled = false, showLimit = true, hideLabel = false, minimal = false, autoFocus = false,
    highlighters, suggesters,
    errorText, customRegex, disableSpace, charLimit,
    rows, spellCheck, autoComplete, autoCorrect, autoCapitalize,
    onValidate, onChange,
}) => {

    const [value, setValue] = useState(val ? val : '');
    const [isTyping, setTyping] = useState(false);
    const [errorState, setErrorState] = useState(false);
    const [showSuggestor, setShowSuggestor] = useState(false);

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

    const [currentSuggestor, setSuggestor] = useState(0);
    const handleChange = (e) => {
        const value = e.currentTarget.value;
        if(typeof onChange === "function")
            onChange(value);

        if(suggesters && suggesters.length > 0)
            suggesters.map((i,index) => {
                const matches = value.match(i.regex);
                if(matches && matches.length > 0) {
                    setShowSuggestor(true);
                    i.onEnter(matches[0]);
                    setSuggestor(index)
                }
                else setShowSuggestor(false);
            });

        setValue(value);
        if(typeof onValidate === "function")
            onValidate(validateInput(value));
    };

    const handleFocus = (e) => {
        setTyping(true);
        setErrorState(false);
    };

    const handleBlur = (e) => {
        setTyping(false);
        const val = e.currentTarget.value;
        if(!validateInput(val))
            setErrorState(true);
    };

    const getBackdropText = (value) => {
        if(highlighters && highlighters)
        {
            highlighters.map(i => value = value.replace(i.regex,`<mark class="${i.className}">$&</mark>`) );
            return value;
        }
        return null
    };

    const textInput = createRef();

    const handleSuggestionSelect = sel => {
        suggesters.map(i => {
            const matches = value.match(i.regex);
            if (matches && matches.length > 0) {
                setShowSuggestor(false);
                const newVal = value.slice(0, -matches[0].length + 1) + sel + ' ';
                setValue(newVal);
                if(typeof onChange === "function")
                    onChange(newVal);
                textInput.current.focus();
            }
        });
    };

    const [currSug, setSug] = useState(0);
    const handleKey = (e) => {
        if(showSuggestor)
        {
            // handle enter key press
            if(e.keyCode === 13){
                e.preventDefault();
                setSug(0);
                const valField =  suggesters[currentSuggestor].valueField ?
                    suggesters[currentSuggestor].valueField : 'value';
                handleSuggestionSelect(suggesters[currentSuggestor].suggestions[currSug][valField]);
            }
            // handle bottom arrow key press
            if(e.keyCode === 40 &&suggesters[currentSuggestor].suggestions.length-1 > currSug)
            {
                e.preventDefault();
                setSug(currSug+1);
            }
            // handle up arrow key press
            if(e.keyCode === 38 && currSug > 0)
            {
                e.preventDefault();
                setSug(currSug-1);
            }
        }
    };

    const renderSuggestions = () => {
        const sug = suggesters[currentSuggestor].suggestions;
        if( sug && sug.length > 0)
        {
            return <SuggestionSelector
                options={sug}
                valueField={
                    suggesters[currentSuggestor].valueField ?
                        suggesters[currentSuggestor].valueField : 'value'
                }
                onSelect={handleSuggestionSelect}
                focused={currSug}
            />
        }
        return null;
    };


    const inputID = `${name}-input-${shortid.generate()}`;

    return <div
        className={classNames(
            "form-group mb-0",
            showSuggestor ? 'position-relative' : null,
            className
        )}
    >
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
        {   type === "textarea" ?
            <div className="d-inline-block w-100 textarea-container position-relative">
                <div
                    className="textarea-backdrop"
                    dangerouslySetInnerHTML={{ __html: getBackdropText(value) }}
                />
                <textarea
                    id={id ? id : inputID}
                    ref={textInput}
                    onKeyDown={handleKey}
                    aria-label={label}
                    placeholder={placeholder}
                    value={value}
                    disabled={isDisabled}
                    rows={rows}
                    className={classNames(
                        inputClassName,
                        'textarea',
                        'form-control text-input-field',
                        { 'minimal': minimal},
                    )}
                    spellCheck={spellCheck}
                    autoComplete={autoComplete}
                    autoCorrect={autoCorrect}
                    autoCapitalize={autoCapitalize}
                    maxLength={charLimit}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required={isRequired}
                    aria-required={isRequired}
                    autoFocus={autoFocus && value.length < 1}
                />
            </div> :
            <input
                ref={textInput}
                onKeyDown={handleKey}
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
                autoFocus={autoFocus && value.length < 1}
            />
        }
        { showSuggestor ? renderSuggestions() : null }
    </div>;

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
    autoComplete: PropTypes.oneOf(["off", "on", "email", "password", "username"]),
    autoCorrect: PropTypes.oneOf(["off", "on"]),
    autoCapitalize: PropTypes.oneOf(["off", "on"]),
    onValidate: PropTypes.func
};

export default TextInput;