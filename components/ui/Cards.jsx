import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import classNames from 'classnames';

import '../../styles/ui/card.sass';

const Card = ({
    children, className: propClasses, style,
    hasShadow = true,
    p = 2, m = 0
}) => {

    return <div className={classNames(
            'bg-white',
            { 'card-shadow': hasShadow },
            `p-${p}`, `m-${m}`,
            propClasses
        )}
        style={style}
    >
        {children}
    </div>

};

Card.propTypes = {
    children: PropTypes.node.isRequired,
    style: PropTypes.object,
    hasShadow: PropTypes.bool,
    p: PropTypes.oneOf([ 0, 1, 2, 3, 4, 5 ]),
    m: PropTypes.oneOf([ 0, 1, 2, 3, 4, 5 ])
};

export default Card;