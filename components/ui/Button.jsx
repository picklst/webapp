import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled'

import { css, keyframes } from 'emotion'

const emptyfunc = () => {};

const gradient = keyframes`
      0% { background-position: 0 50%; } 
      50% { background-position: 0 100%; } 
      100% { background-position: 0 50%; } 
`;

const StyledButton = styled.button`
    font-weight: bold;
    border: none!important;
    margin: 0 0.25rem;
    padding: 0.5rem 1.5rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.5rem;
    cursor: pointer;
    color: ${props => props.brandColors ? 'white!important' : '#424242'};
    background: ${props => props.brandColors ? `linear-gradient(-45deg,#0CC1B0,#0AA5C3)` : '#EEEEEE'};
    background-size: ${props => props.brandColors ? '500% 500%' : null};
    &:hover, &:focus {
      outline: none!important;
      background: ${props => props.brandColors ? `linear-gradient(-45deg,#FF6D00,#FF9100)` : '#E0E0E0'};
      background-size: ${props => props.brandColors ? '550% 550%' : null};
      animation: ${props => props.brandColors ? `${gradient} 1s ease infinite` : null};
    }
`;

const Button = ({
    text, link,
    type, className, brandAccent, target, rel, disabled, title,
    onClick = emptyfunc, onFocus = emptyfunc, onBlur = emptyfunc
}) => {


    return  <StyledButton
        as={link != null ? 'a' : 'button'}
        type={type}
        className={className}
        onClick={(e) => { e.stopPropagation(); onClick(); }}
        onBlur={onBlur}
        onFocus={onFocus}
        tabIndex={0}
        title={title}
        disabled={disabled}
        brandColors={brandAccent}
        href={link}
        target={target}
        rel={rel}
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