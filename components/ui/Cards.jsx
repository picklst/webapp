import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import '../../styles/ui/card.sass';

const Card = ({
    children, className: propClasses, style,
    transparent = false, hasShadow = true,
    p = 2, m = 0,
    onClick
}) => {

    return <div
        className={classNames(
            {'bg-white': !transparent},
            { 'card-shadow': hasShadow && !transparent },
            `p-${p}`, `m-${m}`,
            propClasses
        )}
        onClick={onClick}
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