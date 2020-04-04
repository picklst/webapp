import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import classNames from 'classnames';

import getListAPI from "../../actions/api/getList.ts";

const ListViewer = ({ slug }) => {
    const [data, setData] = useState(null);

    const [isQueried, setQueried] = useState(false);
    const [loadError, setError] = useState(false);
    const [isLoaded, setLoaded] = useState(false);
    useEffect(() => {
        if(!isQueried) {
            getListAPI({
                slug,
                fields: [ "name", "description", "curator", "properties", "items" ]
            }).then(res => {
                setQueried(true);
                if (!Object.prototype.hasOwnProperty.call(res, 'errors')) {
                    setData(res);
                    setLoaded(true);
                }
                else {
                    setError(true);
                }
            });
        }
    });

    console.log(data);

    return isLoaded ? <div>
        <h1>{data.name}</h1>
        <div>By {data.curator.firstName} {data.curator.lastName}</div>
    </div> : null;

};

export default ListViewer;