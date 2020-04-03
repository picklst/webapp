import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import '../../styles/ui/button.sass';

const Button = ({ text, link, onClick, type, className: classes }) => {
    return link ?
    <a href={link}>
        <button className={classNames("srx-button", classes)}>
            {text}
        </button>
    </a>
    :<button
        type={type}
        className={classNames("srx-button", classes)}
        onClick={onClick}
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