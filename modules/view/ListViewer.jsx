import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import classNames from 'classnames';

import getListAPI from "../../actions/api/getList.ts";
import ListItemViewer from "./item/viewer";
import ListHeaderViewer from "./list/header";

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

    const renderListItems = () => {
        return data.items.map(i =>
            <ListItemViewer
                key={shortid.generate()}
                name={i.name}
                comment={i.comment}
                url={i.url}
            />
        )
    };

    return isLoaded ? <div className="container">
        <ListHeaderViewer
            name={data.name}
            slug={slug}
            curator={data.curator}
        />
        { renderListItems() }
    </div> : null;

};

export default ListViewer;