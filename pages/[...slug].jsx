import React, {useEffect, useState} from 'react';
import ErrorPage from "../components/core/ErrorPage";
import { getListAPI } from "../components/list/api";

import { List } from "../components/pages";

import {APIRequest} from "../utils";
const prefetchEndpoint = process.env.PREFETCH_SERVER_ENDPOINT;

const ListPage = ({ slug, username, coverURL, name: propName, isEditing }) => {
    const [name, setName] = useState(propName);

    const [loadError, setError] = useState(false);
    const [isLoaded, setLoaded] = useState(propName !== null);

    useEffect(() => {
        if(propName == null) {
            const query = getListAPI({ fields: ["name"] });
            APIRequest({query, variables: { slug, username }, requireAuth: false }).then(res => {
                if (!Object.prototype.hasOwnProperty.call(res, 'errors')) {
                    setName(res.list.name);
                    setLoaded(true);
                }
                else {
                    setError(true);
                }
            }).catch((e) => setError(true));
        }
    }, []);

    const generateTitle = () => `${name !== null ? name : slug} - @${username}`;

    const generateDescription = () => {
        return `See lists created and shared by @${username}'s profile on Picklst.`
    };

    const renderListingPage = () => propName !== null &&
    <List
        name={name}
        title={generateTitle()}
        description={generateDescription()}
        coverURL={coverURL}
        isEditing={isEditing}
        slug={slug}
        username={username}
    />;

    return loadError ?
    <ErrorPage
        heading="List Not Found"
        title="List Not Found"
        description="We cannot retrieve this page at the moment. Please try again later, or check the url."
    /> : renderListingPage();
};

ListPage.getInitialProps = async ({ query }) => {
    const username = query.slug[0];
    const slug = query.slug[1];
    const isEditing = query.slug[2] === "edit";
    const q = getListAPI({ fields: [ "name", "coverURL" ] });
    return await APIRequest({
        query: q,
        variables: { slug, username },
        requireAuth: false,
        endpoint: prefetchEndpoint
    }).then(res => {
        return {
            name: res.list.name,
            slug: slug,
            username: username,
            coverURL: res.list.coverURL,
            isEditing
        }
    }).catch((e) => {
        return {
            name: null,
            slug: slug,
            username: username,
            isEditing,
            coverURL: null
        }
    });


};

export default ListPage;