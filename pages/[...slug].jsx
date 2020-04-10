import React, {useEffect, useState} from 'react';
import Base from "../components/core/Base";
import ErrorPage from "../components/core/ErrorPage";
import getListAPI from "../actions/api/getList.ts";
import ListViewer from "../modules/view/ListViewer";

import createItemAPI from "../actions/api/createItem.ts";
import updateItemAPI from "../actions/api/updateItem.ts";
import moveItemAPI from "../actions/api/moveItem.ts";
import deleteItemAPI from "../actions/api/deleteItem.ts";

const ListPage = (props) => {
    const [slug, setSlug] = useState(props.slug);
    const [username, setUsername] = useState(props.username);
    const [name, setName] = useState(props.name);
    const [data, setData] = useState(null);

    const [isQueried, setQueried] = useState(false);
    const [loadError, setError] = useState(false);
    const [isLoaded, setLoaded] = useState(props.name !== null);

    useEffect(() => {
        if(!isQueried) {
            getListAPI({
                slug,
                username,
                fields: [ "name", "description", "curator", "properties", "items" ]
            }).then(res => {
                setQueried(true);
                if (!Object.prototype.hasOwnProperty.call(res, 'errors')) {
                    setSlug(res.slug);
                    setName(res.name);
                    setData(res);
                    setLoaded(true);
                }
                else {
                    setError(true);
                }
            });
        }
    });

    const handleAddItem = (data) => {
        createItemAPI({
            object: data,
            slug
        }).then(r => {
            console.log(r);
            setQueried(false);
        })
    };

    const handleEditItem = (data) => {
        updateItemAPI({
            object: data,
            slug
        }).then(r => {
            console.log(r);
            setQueried(false);
        });
    };

    const handleDeleteItem = (key) => {
        deleteItemAPI({
            key,
            slug
        }).then(r => {
            console.log(r);
            setQueried(false);
        });
    };

    const handleMoveItem = ({ key, direction }) => {
        moveItemAPI({
            key, direction
        }).then(r => {
           console.log(r);
           setQueried(false);
        });
    };

    const generateTitle = () => {
        if( name !== null)
            return `${name} - @${username}`;
        else
            return `${slug} - @${username}`
    };

    const generateDescription = () => {
        return `See lists created and shared by @${username}'s profile on Picklst.`
    };


    const renderListingPage = <Base
        meta={{ title: generateTitle(), description: generateDescription() }}
    >
        { isLoaded && data ?
            <ListViewer
                slug={slug}
                data={data}
                onAddItem={handleAddItem}
                onDeleteItem={handleDeleteItem}
                onEditItem={handleEditItem}
                onMove={handleMoveItem}
            />
            : null
        }
    </Base>;

    return loadError ? <ErrorPage
        title="Page Not Found"
        description="We cannot retrieve this page at the moment. Please try again later, or check the url."
    /> : renderListingPage;
};

ListPage.getInitialProps = async ({ query }) => {
    const username = query.slug[0];
    const slug = query.slug[1];
    const res = await getListAPI({
        slug,
        username,
        fields: [ "name", ],
        endpoint: "http://framework:8000"
    });
    if (!Object.prototype.hasOwnProperty.call(res, 'errors')) {
        return {
            name: res.name,
            slug: slug,
            username: username
        }
    } else {
        return {
            name: null,
            slug: slug,
            username: username
        }
    }
};

export default ListPage;