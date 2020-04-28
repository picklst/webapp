import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styled from 'styled-components';


import '../../styles/ui/button.sass';

const emptyfunc = () => {};

const StyledButton = styled.button`
    font-weight: bold;
    border: none!important;
    margin-right: 0.5rem;
    padding: 0.5rem 1.5rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.5rem;
    &:hover, &:focus {
      outline: none!important;
    }
`;

const Button = ({
    text, link,
    type, className,
    onClick = emptyfunc, onFocus = emptyfunc, onBlur = emptyfunc
}) => {
    return link ?
    <a href={link}>
        <StyledButton className={className}>
            {text}
        </StyledButton>
    </a>
    : <StyledButton
        type={type}
        className={className}
        onClick={onClick}
        onBlur={onBlur}
        onFocus={onFocus}
        tabIndex={0}
    >
        {text}
    </StyledButton>
};

Button.propTypes = {
    text: PropTypes.node,
    link: PropTypes.string,
    onClick: PropTypes.func,
    className: PropTypes.string
};

export default Button;