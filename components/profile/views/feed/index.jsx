import React from 'react';
import shortid from 'shortid';
import { Waypoint } from 'react-waypoint';

import ListCard from "../../../../modules/cards/list";
import EmptyFeed from './empty';

export default ({ listData, username, onLoadMore, canLoadMore }) => {

    return <React.Fragment>
    {
        listData && listData.length > 0 ?
            <div className="row mx-0 mb-4">
                {
                    listData.map(i =>
                        <div key={shortid.generate()} className="col-md-12 p-2">
                            <ListCard
                                username={username}
                                name={i.name}
                                slug={i.slug}
                                createdTim
                                estamp={i.createdTimestamp}
                                lastEditTimestamp={i.lastEditTimestamp}
                            />
                        </div>
                    )
                }
            </div> : <EmptyFeed username={username} />
    }
    {   canLoadMore ?
        <Waypoint onEnter={onLoadMore}>
            <div style={{ height: '15vh' }} />
        </Waypoint> : null
    }
    </React.Fragment>


};