import React, {useEffect, useState} from 'react';
import Base from "../components/core/Base";
import ErrorPage from "../components/core/ErrorPage";
import getUserAPI from "../components/profile/api/getUser.ts";

import { ProfilePage } from '../components/profile';

const UserProfilePage = (props) => {
    const [username, setUsername] = useState(props.username);
    const [firstName, setFirstName] = useState(props.firstName);
    const [lastName, setLastName] = useState(props.lastName);

    const [isQueried, setQueried] = useState(false);
    const [loadError, setError] = useState(false);
    const [isProfileLoaded, setLoaded] = useState(false);

    useEffect(() => {
        if(!isQueried) {
            console.log('queried');
            getUserAPI({
                username: username,
                fields: [ "firstName", "lastName" ],
                requireAuth: false
            }).then(res => {
                setQueried(true);
                if (!Object.prototype.hasOwnProperty.call(res, 'errors')) {
                   setUsername(res.username);
                   setFirstName(res.firstName);
                   setLastName(res.lastName);
                   setLoaded(true);
                }
                else {
                    setError(true);
                }
            }).catch(e => {
                console.log(e);
            });
        }
    });

    const generateTitle = () =>
    firstName !== null || lastName !== null ?
    `${firstName} ${lastName} (${username})` : `@${username}`;

    const generateDescription = () => `See lists created and shared by @${username}'s profile on Picklst.`;


    const renderProfilePage = <Base
        meta={{ title: generateTitle(), description: generateDescription() }}
    >
        <div className="min-vh-100">
            <ProfilePage username={username} />
        </div>
    </Base>;

    return loadError ?
    <ErrorPage
        title="Page Not Found"
        description="We cannot retrieve this page at the moment. Please try again later, or check the url."
    /> : renderProfilePage;
};

UserProfilePage.getInitialProps = async ({ query }) => {
    const res = await getUserAPI({
        username: query.username,
        fields: [ "firstName", "lastName" ],
        endpoint: "http://framework:8000/api/graphql/",
        requireAuth: false
    });
    if (!Object.prototype.hasOwnProperty.call(res, 'errors')) {
        return {
            firstName: res.firstName,
            lastName: res.lastName,
            username: query.username,
        }
    } else {
        return {
            firstName: null,
            lastName: null,
            username: query.username,
        }
    }
};

export default UserProfilePage;