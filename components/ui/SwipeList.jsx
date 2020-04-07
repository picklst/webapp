import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import '../../styles/ui/swipelist.sass';

const SwipeList = ({ items, selectedIndex, minWidth = '60px', width = 'auto', role, itemRole }) => {

    const listID = shortid.generate();
    return <div className="srx-swipe-list">
        <div
            className="list-container"
            role={role ? role : null}
            aria-activedescendant={itemRole === "option" && selectedIndex ? `swipelist-${listID}-${selectedIndex}` : null}
        >
            {items.map((i,index) =>
                <div
                    style={{ minWidth, width }}
                    className="swipe-list-item mr-2"
                    key={shortid.generate()}
                    id={`swipelist-${listID}-${index}`}
                    aria-selected={itemRole === "option" && selectedIndex ? index===selectedIndex : null}
                    role={ itemRole ? itemRole : null}
                >
                    {i}
                </div>
            )}
        </div>
    </div>

};

SwipeList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.node),
    selectedIndex: PropTypes.number,
    minWidth: PropTypes.number,
    itemRole: PropTypes.string,
    role: PropTypes.string
};

export default SwipeList;