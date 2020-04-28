import React, {useEffect, useState} from 'react';
import {useGlobalState} from "../../../../actions/states/Auth.ts";
import getUserAPI from "../../api/getUser.ts";

import { Card } from '../../views';

export default ({ username }) => {
    const [data, setData] = useState(false);
    const [isQueried, setQueried] = useState(false);

    const [myUserData, setUserInfo] = useGlobalState('UserInfo');

    useEffect(() => {
        if (!isQueried) {
            getUserAPI({
                username,
                fields: [
                    "firstName", "lastName", "bio", "url",
                    "avatarURL", "coverURL", "isVerified", "stats",
                    "listCreatedCount", "followersCount", "followingCount",
                ],
                requireAuth: false
            }).then(r => {
                if(myUserData && username === myUserData.username)
                    setUserInfo(r);
                setQueried(true);
                setData(r);
            })
        }
    });

    return data ?
        <Card {...data} requireUpdate={() => setQueried(false)} />
    : <h1>Loading</h1>

};