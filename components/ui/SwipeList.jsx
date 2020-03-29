import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import '../../styles/ui/swipelist.sass';

const SwipeList = ({ items, minWidth = '60px', width = 'auto' }) => {

    return <div className="srx-swipe-list">
        <div className="list-container">
            {items.map(i =>
                <div
                    style={{ minWidth, width }}
                    className="swipe-list-item mr-2"
                    key={shortid.generate()}
                >
                    {i}
                </div>
            )}
        </div>
    </div>

};

SwipeList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.node),
    minWidth: PropTypes.number
};

export default SwipeList;