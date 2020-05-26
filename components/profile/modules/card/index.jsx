import React, {useEffect, useState} from 'react';
import { useGlobalState, setUserInfo } from "../../../../actions/states/Auth.ts";
import getUserAPI from "../../api/getUser.ts";

import { Card } from '../../views';
import {APIRequest} from "../../../../utils";

export default ({ username }) => {
    const [myUserData] = useGlobalState('UserInfo');
    const [data, setData] = useState(  false);

    const fetchProfile = () => {
        if(!myUserData || username !== myUserData.username)
        {
            const query = getUserAPI({
                fields: [
                    "firstName", "lastName", "bio", "url",
                    "avatarURL", "coverURL", "isVerified", "stats",
                    "listCreatedCount", "followersCount", "followingCount",
                ],
            });
            APIRequest({ query, variables: { username }, requireAuth: !!myUserData }).then((r) => {
                if(myUserData && username === myUserData.username)
                    setUserInfo(r.user);
                setData(r.user);
            }).catch((e) => {
                console.error("failed loading profile card");
            })
        }
        else {
            setData(myUserData);
            const query = `{
              me
              {
                username
                firstName
                lastName
                name
                bio
                url
                isVerified
                avatarURL
                coverURL
                stats
                {
                  listsCreatedCount
                  followingCount
                  followingCount
                  followersCount
                }
              }
            }`;
            APIRequest({ query, requireAuth: true }).then((response) => {
                setData(response.me);
                setUserInfo({
                    ...response.me,
                    "avatarURL": response.me.avatarURL ? response.me.avatarURL.split("?")[0] : null,
                    "coverURL":  response.me.coverURL ? response.me.coverURL .split("?")[0] : null,
                    "lastUpdated": new Date().toISOString()
                });
            }).catch((e) => {
                console.error("failed loading profile card");
            });
        }
    };

    useEffect(() => fetchProfile(), []);

    return data ?
        <Card {...data} requireUpdate={() => fetchProfile()} />
    : null

};