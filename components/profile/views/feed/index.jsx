import React from 'react';
import shortid from 'shortid';
import styled from 'styled-components';
import { Waypoint } from 'react-waypoint';

import { ListCard } from "../../../list";
import EmptyFeed from './empty';

const FeedWrapper = styled.div`
  margin: 5vh 0 15vh 0;
`;

export default ({ listData, onLoadMore, canLoadMore }) => {

    return <React.Fragment>
    {
        listData && listData.length > 0 ?
            <FeedWrapper className="row">
            {
                listData.map(i =>
                    <div key={shortid.generate()} className="col-md-12 p-2">
                        <ListCard {...i} />
                    </div>
                )
            }
            </FeedWrapper> :
            <EmptyFeed username={username} />
    }
    {   canLoadMore ?
        <Waypoint onEnter={onLoadMore}>
            <div style={{ height: '15vh' }} />
        </Waypoint> : null
    }
    </React.Fragment>


};