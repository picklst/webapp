import React, {useEffect, useState} from 'react';
import Base from "../components/core/Base";
import ErrorPage from "../components/core/ErrorPage";
import getUserAPI from "../actions/api/getUser.ts";

import { ProfileCard, ProfileFeed } from '../components/profile';

const UserProfilePage = (props) => {
    const [username, setUsername] = useState(props.username);
    const [firstName, setFirstName] = useState(props.firstName);
    const [lastName, setLastName] = useState(props.lastName);

    const [isQueried, setQueried] = useState(false);
    const [loadError, setError] = useState(false);
    const [isProfileLoaded, setLoaded] = useState(false);
    useEffect(() => {
        if(!isQueried) {
            getUserAPI({
                username: username,
                fields: [ "firstName", "lastName" ]
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
            });
        }
    });

    const generateTitle = () => {
        if(firstName !== null || lastName !== null)
            return `${firstName} ${lastName} (${username})`;
        else
            return `@${username}`
    };

    const generateDescription = () => {
        return `See lists created and shared by @${username}'s profile on Picklst.`
    };


    const renderProfilePage = <Base
        meta={{ title: generateTitle(), description: generateDescription() }}
    >
        <div className="min-vh-100">
            {
                isProfileLoaded ?
                    <div className="row mx-0 p-lg-4 p-md-2 p-0">
                        <div className="col-md-2 px-2">
                        </div>
                        <div className="col-md-10 p-0">
                            <ProfileCard username={username} />
                            <div className="row m-0">
                                <div className="col-md-9 my-3">
                                    <ProfileFeed username={username} />
                                </div>
                            </div>

                        </div>
                    </div> : null
            }
        </div>
    </Base>;

    return loadError ? <ErrorPage
        title="Page Not Found"
        description="We cannot retrieve this page at the moment. Please try again later, or check the url."
    /> : renderProfilePage;
};

UserProfilePage.getInitialProps = async ({ query }) => {
    const res = await getUserAPI({
        username: query.username,
        fields: [ "firstName", "lastName" ],
        endpoint: "http://framework:8000"
    });
    if (!Object.prototype.hasOwnProperty.call(res, 'errors')) {
        return {
            firstName: res.firstName,
            lastName: res.lastName,
            username: res.username,
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