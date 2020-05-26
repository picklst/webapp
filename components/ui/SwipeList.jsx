import React from 'react';
import styled from '@emotion/styled'
import PropTypes from 'prop-types';
import shortid from 'shortid';

const ListContainer = styled.div`
    width: 100%;
    max-height: 35vh;
    overflow-y: auto;
    display: flex;
    align-items: center;
    @media screen and (max-width: 700px)
    {
        display: flex;
        max-height: unset;
        overflow-y: hidden;
        overflow-x: auto;
    }
`;

const SwipeListItem = styled.div`
      margin: 0.25rem;
      display: inline-block;
      min-width: ${props => `${props.minWidth}px` };
      width: ${props => props.width};
`;

const SwipeList = ({ items, selectedIndex, minWidth = 60, width = 'auto', role, itemRole }) => {

    const listID = shortid.generate();
    return <ListContainer
        role={role ? role : null}
        aria-activedescendant={itemRole === "option" && selectedIndex ? `swipelist-${listID}-${selectedIndex}` : null}
    >
        {items.map((i,index) =>
            <SwipeListItem
                minWidth={minWidth}
                width={width}
                key={shortid.generate()}
                id={`swipelist-${listID}-${index}`}
                aria-selected={itemRole === "option" && selectedIndex ? index===selectedIndex : null}
                role={ itemRole ? itemRole : null}
            >
                {i}
            </SwipeListItem>
        )}
    </ListContainer>

};

SwipeList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.node),
    selectedIndex: PropTypes.number,
    minWidth: PropTypes.number,
    itemRole: PropTypes.string,
    role: PropTypes.string
};

export default SwipeList;