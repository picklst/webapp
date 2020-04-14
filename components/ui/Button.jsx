import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import '../../styles/ui/button.sass';

const emptyfunc = () => {};

const Button = ({
    text, link,
    type, className: classes,
    onClick = emptyfunc, onFocus = emptyfunc, onBlur = emptyfunc
}) => {
    return link ?
    <a href={link}>
        <button className={classNames("srx-button", classes)}>
            {text}
        </button>
    </a>
    : <button
        type={type}
        className={classNames("srx-button", classes)}
        onClick={onClick}
        onBlur={onBlur}
        onFocus={onFocus}
        tabIndex={0}
    >
        {text}
    </button>
};

Button.propTypes = {
    text: PropTypes.node,
    link: PropTypes.string,
    onClick: PropTypes.func,
    className: PropTypes.string
};

export default Button;