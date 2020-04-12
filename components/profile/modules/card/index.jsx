import React, {useEffect, useState} from 'react';
import getUserAPI from "../../api/getUser.ts";

import { Card } from '../../views';

export default ({ username }) => {
    const [data, setData] = useState(false);

    const [isQueried, setQueried] = useState(false);

    useEffect(() => {
        if (!isQueried) {
            getUserAPI({
                username,
                fields: [
                    "firstName", "lastName", "bio", "url",
                    "avatarURL", "coverURL", "isVerified", "stats",
                    "listCreatedCount", "followersCount", "followingCount",
                ]
            }).then(r => {
                setQueried(true);
                setData(r);
            })
        }
    });

    return data ? <Card {...data} /> : <h1>Loading</h1>

};