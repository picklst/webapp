import React, {useEffect, useState} from 'react';
import Base from "../components/core/Base";
import ErrorPage from "../components/core/ErrorPage";
import getUserAPI from "../components/profile/api/getUser.ts";

import { Profile } from '../components/pages';
import {APIRequest} from "../utils";
const prefetchEndpoint = process.env.PREFETCH_SERVER_ENDPOINT;

const UserProfilePage = (props) => {
    const [firstName, setFirstName] = useState(props.firstName);
    const [lastName, setLastName] = useState(props.lastName);

    const [loadError, setError] = useState(false);
    const [isProfileLoaded, setLoaded] = useState(false);

    const fetchMeta = () => {
        if(!firstName) {
            const query = getUserAPI({ fields: [ "firstName", "lastName" ]});
            APIRequest({ query, variables: { username: props.username }, requireAuth: false,}).then((data) => {
                console.log(data);
                setFirstName(data.user.firstName);
                setLastName(data.user.lastName);
                setLoaded(true);
            }).catch((e) => {
                setError(true);
            });
        }
    };

    useEffect(() => fetchMeta(), []);

    const generateTitle = () => firstName !== null || lastName !== null ?
    `${firstName} ${lastName} (${props.username})` : `@${props.username}`;

    const generateDescription = () => `See lists created and shared by @${props.username}'s profile on Picklst.`;

    return loadError ?
    <ErrorPage
        title="Page Not Found"
        heading="Sorry, this page isn't available."
        description="We cannot retrieve this page at the moment. The link you followed may be broken, or the page may have been removed."
    /> :
    <Base meta={{ title: generateTitle(), description: generateDescription(), image: props.avatarURL }}>
        { firstName || isProfileLoaded ? <Profile username={props.username} /> : null}
    </Base>;
};

UserProfilePage.getInitialProps = async ({ query }) => {
    const username = query.username.startsWith('@') ? query.username.substr(1) : query.username;
    const q = getUserAPI({ fields: [ "firstName", "lastName", "avatarURL" ] });
    return await APIRequest({
        query: q,
        variables: { username },
        requireAuth: false,
        endpoint: prefetchEndpoint
    }).then((res) => {
        if (res && !Object.prototype.hasOwnProperty.call(res, 'errors'))
            return {
                firstName: res.user.firstName,
                lastName: res.user.lastName,
                avatarURL: res.user.avatarURL,
                username
            }
    }).catch((e) => {
        return {
            firstName: null,
            lastName: null,
            username,
            avatarURL: null
        }
    })
};

export default UserProfilePage;