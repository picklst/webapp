import React, {useEffect, useState} from 'react';

import getListsAPI from "../../../../actions/api/getLists.ts";

import { Feed } from '../../views'

export default ({ username }) => {
    const [data, setData] = useState([]);
    const [offset, setOffset] = useState(0);

    const [maxLoaded, setMaxLoaded] = useState(false);
    const handleLoadMore = () => {
        if(isQueried)
        {
            setOffset(offset + 2);
            setQueried(false);
        }
    };
    const [isQueried, setQueried] = useState(false);
    const [loadError, setError] = useState(false);
    const [isLoaded, setLoaded] = useState(false);
    useEffect(() => {
        if(!isQueried){
            getListsAPI({
                fields: [ "name", "lastUpdateTimestamp", "createdTimestamp" ],
                limit: 2,
                offset: offset,
                query: {
                    username: username
                }
            }).then(r => {
                setQueried(true);
                if(r.length === 0)
                    setMaxLoaded(true);
                setData([...data, ...r]);
                setLoaded(true);
            })
        }
    });

    return isLoaded ? <Feed
        username={username}
        listData={data}
        onLoadMore={handleLoadMore}
        canLoadMore={!maxLoaded}
    /> : null;

};