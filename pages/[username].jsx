import React, {useEffect, useState} from 'react';
import Base from "../components/core/Base";
import ErrorPage from "../components/core/ErrorPage";
import getUserAPI from "../actions/api/getUser.ts";

const UserProfilePage = (props) => {
    const [username, setUsername] = useState(props.username);
    const [firstName, setFirstName] = useState(props.firstName);
    const [lastName, setLastName] = useState(props.lastName);
    const [userData, setUserData] = useState(null);

    const [isQueried, setQueried] = useState(false);
    const [loadError, setError] = useState(false);
    const [isProfileLoaded, setLoaded] = useState(true);
    useEffect(() => {
        if(!isQueried) {
            getUserAPI({
                username: username,
                fields: [
                    "firstName", "lastName", "bio", "url",
                    "avatarURL", "coverURL",
                    "listCreatedCount", "followersCount", "followingCount",
                ]
            }).then(res => {
                setQueried(true);
                if (!Object.prototype.hasOwnProperty.call(res, 'errors')) {
                   setUsername(res.username);
                   setFirstName(res.firstName);
                   setLastName(res.lastName);
                   setUserData(res);
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
        <div className="container d-flex align-items-center justify-content-center p-2 min-vh-100">
            {
                isProfileLoaded ?
                    <div>
                        {username}
                    </div>
                : null
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