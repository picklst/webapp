import React, {useEffect, useState} from 'react';
import shortid from 'shortid';

import getListsAPI from "../../actions/api/getLists.ts";
import ListCard from "../cards/list";

const UserListsFeed = ({
    username
}) => {
    const [data, setData] = useState(null);

    const [isQueried, setQueried] = useState(false);
    const [loadError, setError] = useState(false);
    const [isLoaded, setLoaded] = useState(false);

    useEffect(() => {
        if(!isQueried){
            getListsAPI({
                fields: [ "name", "lastUpdateTimestamp", "createdTimestamp" ],
                limit: 10,
                offset: 0,
                query: {
                    username: username
                }
            }).then(r => {
                setQueried(true);
                setData(r);
                setLoaded(true);
            })
        }
    });

    const renderFeedLists = () =>
    <div className="row m-0">
    {
        data && data.length > 0 ?
            data.map(i =>
                <div key={shortid.generate()} className="col-md-6 p-2">
                    <ListCard
                        username={username}
                        name={i.name}
                        slug={i.slug}
                        createdTimestamp={i.createdTimestamp}
                        lastEditTimestamp={i.lastEditTimestamp}
                    />
                </div>
            )
        : null
    }
    </div>;

    return <div>
    { isLoaded ? renderFeedLists() : null }
    </div>

};

export default UserListsFeed;