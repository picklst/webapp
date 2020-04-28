import React, {useEffect, useState} from 'react';

import { Feed } from '../../views'
import { getListsAPI } from "../../../list";
import { APIRequest } from "../../../../utils";
import ErrorCard from "../../../core/ErrorCard";

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
    const [error, setError] = useState(false);
    const [isLoaded, setLoaded] = useState(false);

    const query = getListsAPI({
        fields: [
            "name", "lastUpdateTimestamp", "createdTimestamp", "curator", "itemCount",
            "properties", "userCanEdit"
        ],
    });

    useEffect(() => {
        if(!isQueried){
            APIRequest(
                { query, variables: { limit: 2, offset, query: { username } }}
            ).then((r) => {
                setQueried(true);
                if(r.data.lists.length === 0)
                    setMaxLoaded(true);
                else if(data.length === 0)
                    setData(r.data.lists);
                else
                    setData([...data, ...r.data.lists]);
                setLoaded(true);
            }).catch(e => {
                setQueried(true);
                setError(e);
            })
        }
    });


    return error ? <ErrorCard {...error} />
    : isLoaded ?
    <Feed
        username={username}
        listData={data}
        onLoadMore={handleLoadMore}
        canLoadMore={!maxLoaded}
    /> : null;

};