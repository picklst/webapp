import React, {useEffect, useRef, useState} from "react";
import classNames from "classnames";
import shortid from "shortid";
import styled from '@emotion/styled'

import {containsSpace, emailValidator} from "../../../data/regexValidators";
import PropTypes from "prop-types";

import DropDown from "../DropDown";

import CharLimitWarning from './charLimitWarning';
import SuggestionSelector from "./suggestions";


const TextAreaBackdrop = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    line-height: 1.5;
    padding: .375rem .75rem;
    z-index: 1;
    mark {
        opacity: 0.35;
        padding: 0!important;
        background: #ffe8a1;
        border-radius: 0.25rem;
    }
`;

const StyledTextArea = styled.textarea`
    position: relative!important;
    top: 0;
    left: 0;
    z-index: 100;
    background: none!important;
    border-radius: 0!important;
    
    ${({ minimal }) => minimal && `
          border-radius: 0;
          border: none;
          border-bottom: 1.2px solid;
          &:focus {
            outline: none!important;
            box-shadow: none!important;
          }
    `}
`;


const TextInput = ({
    id, label, name, placeholder, type, value: val, inputClassName, className,
    isRequired = false, isDisabled = false, showLimit = true, alwaysShowLabel = false, hideLabel = false, minimal = false, autoFocus = false,
    hasErrors = false, highlighters, suggesters,
    errorText, customRegex, disableSpace, charLimit,
    rows, spellCheck, autoComplete, autoCorrect, autoCapitalize,
    onValidate, onChange, onFocus, onBlur
}) => {

    const inputID = `${name}-input-${shortid.generate()}`;

    const [value, setValue] = useState(val ? val : '');

    const [isTyping, setTyping] = useState(false);
    const [errorState, setErrorState] = useState(false);

    const [showSuggestor, setShowSuggestor] = useState(false);
    const [currentSuggestor, setSuggestor] = useState(0);
    const [currSug, setSug] = useState(0);


    const textInput = useRef();
    const backdropRef = useRef();

    // set ID only after mount, to avoid mismatch warnings
    useEffect(() => { textInput.current.id = inputID || id; }, []);

    const validateInput = (str) => {
        if(str.length < 1) return false;
        if(type === "email" && !emailValidator.test(String(str).toLowerCase()))
            return false;
        if(disableSpace && !containsSpace.test(String(str).toLowerCase()))
            return false;
        if(customRegex && !new RegExp(customRegex, 'g').test(String(str).toLowerCase()))
            return false;
        //@todo more conditions can be added here later
        return true;
    };

    const getBackdropText = (value) => {
        if(highlighters && highlighters)
        {
            value = value.replace(/\r\n/g, '<br />').replace(/[\r\n]/g, '<br />');
            highlighters.map(i => value = value.replace(i.regex,`<mark class="${i.className}">$&</mark>`) );
            return value;
        }
        return null
    };

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


    const handleScroll = () => {
        if(type === "textarea" && textInput.current.scrollTop !== 0)
            backdropRef.current.scrollTop = textInput.current.scrollTop;
    };
    useEffect(handleScroll, [textInput]);

    const handleFocus = (e) => {
        if(typeof onFocus === "function")
            onFocus();
        setTyping(true);
        setErrorState(false);
    };

    const handleBlur = (e) => {
        if(typeof onBlur === "function")
            onBlur();
        setTyping(false);
        const val = e.currentTarget.value;
        if(!validateInput(val))
            setErrorState(true);
    };

    const handleKeyDown = (e) => {
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
            if(e.keyCode === 40 && suggesters[currentSuggestor].suggestions.length-1 > currSug)
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

    const props =
    {
        ref: textInput,
        "aria-label": label,
        "aria-required":  isRequired,
        value,
        placeholder,
        isDisabled,
        spellCheck,
        autoComplete,
        autoCorrect,
        autoCapitalize,
        autoFocus: autoFocus && value.length < 1,
        maxLength: charLimit,
        required: isRequired,
        minimal: minimal,
        onKeyDown: handleKeyDown,
        onFocus: handleFocus,
        onBlur: handleBlur,
        onChange: handleChange,
    };

    const renderInput = type === "textarea" ?
    <div className="d-inline-block w-100 textarea-container position-relative">
        <TextAreaBackdrop ref={backdropRef} dangerouslySetInnerHTML={{ __html: getBackdropText(value) }} />
        <StyledTextArea
            rows={rows}
            onScroll={handleScroll}
            className={classNames(inputClassName, 'form-control text-input-field',)}
            {...props}
        />
    </div> :
    <input
        name={name}
        type={type}
        className={classNames(
            inputClassName,
            'd-block form-control',
            { 'is-invalid' : (hasErrors || errorState) && (value.length > 0 || isRequired) },
            { 'minimal': minimal},
        )}
        {...props}
    />;

    const renderLabel = !hideLabel &&
    <div className="col-8 p-1">
        <label
            htmlFor={id ? id : inputID}
            aria-hidden={false}
            className={value.length > 0 && !errorState || alwaysShowLabel ? 'font-weight-bold text-primary small' : 'd-none'}
        >
            {label}
        </label>
    </div>;

    const renderErrorState = (hasErrors || errorState) && (value.length > 0 || isRequired) &&
    <div className="small text-danger mb-1">
        {errorText ? errorText : `Please enter a valid ${String(label).toLowerCase()}.`}
    </div>;

    const renderSuggestions = () => {
        if(suggesters && suggesters.length > 0)
        {
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
        }
        return null;
    };

    return <div
        className={classNames(
            "form-group mb-0",
            {'position-relative': showSuggestor},
            className
        )}
    >
        <div className="row m-0">
            {renderLabel}
            <CharLimitWarning show={showLimit && isTyping} charLimit={charLimit} currentLength={value.length}/>
        </div>
        {renderErrorState}
        <DropDown
            customTrigger={renderInput}
            dropDownClassName="shadow-lg w-100 rounded"
            onClose={() => setShowSuggestor(false)}
            isOpen={showSuggestor}
            dropdownComponent={renderSuggestions()}
        />
    </div>

};

TextInput.propTypes  = {
    id: PropTypes.string,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    type: PropTypes.oneOf(["email", "password", "text", "textarea", "search", "url"]),
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