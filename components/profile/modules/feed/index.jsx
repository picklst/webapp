import React, {useEffect, useState} from 'react';

import { Feed } from '../../views'
import { getListsAPI } from "../../../list";
import { APIRequest } from "../../../../utils";
import ErrorCard from "../../../core/ErrorCard";

export default ({ username }) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(false);

    const fetchList = async (variables) => {
        const query = getListsAPI({
            fields: [
                "name", "topic", "timestampCreated", "timestampLastEdited", "curator", "itemCount",
                "properties", "userCanEdit", "coverURL"
            ],
        });
        return await APIRequest({ query, variables, requireAuth: false }).then((data) => {
            return { success: true, data };
        }).catch((errors) => {
            return { success: false, errors }
        })
    };

    const [lastCursor, setCursor] = useState(null);
    const handleFetch = (after = lastCursor) => {
        const variables = { count: 15, query: { username } };
        if(after)
            variables['after'] = after;
        fetchList(variables).then(({ success, errors, data: d }) => {
            if (success && d) {
                setCursor(d.lists && d.lists.hasNext ? d.lists.lastCursor : null);
                // @todo confirm lists.lists will always be an array
                setData(data.length > 0 ? [...data, ...d.lists.lists] : d.lists.lists);
            } else {
                setError(errors);
                console.error('failed to load', errors);
            }
        });
    };

    useEffect(() => handleFetch(), []);

    const handleDelete = (index) => {
        setData((p) => [
            ...data.slice(0,index),
            ...data.slice(index+1)
        ]);
    };

    return error ? <ErrorCard {...error} />
    : data ?
    <Feed
        username={username}
        listData={data}
        onDelete={handleDelete}
        onLoadMore={() => handleFetch()}
        canLoadMore={lastCursor !== null}
    /> : null;

};