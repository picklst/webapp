import React, {useEffect, useState} from 'react';
import {useGlobalState} from "../../../../actions/states/Auth.ts";
import { AuthCard } from '../../../auth'

import { FollowButton } from '../../views'
import { isFollowerAPI, followUserAPI, unfollowUserAPI } from "../../api"


export default ({ username, onChange }) => {

    const [isClicked, setClicked] = useState(false);
    const [token] = useGlobalState('token');
    const [isLoggedIn, setLoggedIn] = useState(!!token);
    const [isFollower, setFollower] = useState(false);

    const [isLoaded, setLoaded] = useState(false);
    useEffect(() => {
        if(isLoggedIn && !isLoaded)
            isFollowerAPI({ username }).then(r => {
                setFollower(r);
                setLoaded(true);
            });
    });

    const handleFollowUser = () => {
        followUserAPI({ username }).then(r => {
            setFollower(true);
            if(typeof onChange === "function")
                onChange();
        })
    };

    const handleUnfollowUser = () => {
        unfollowUserAPI({ username }).then(r => {
            setFollower(false);
            if(typeof onChange === "function")
                onChange();
        })
    };

    const handleFollow = () => {
          if(!isLoggedIn)
            setClicked(true);
          else {
              if(isFollower) handleUnfollowUser();
              else handleFollowUser();
          }
    };

    return isClicked && !isLoggedIn ?
    <AuthCard
        variant="bottom-popup"
        onClose={() => setClicked(false)}
        onComplete={() => setLoggedIn(true)}
    /> :
    <FollowButton
        isFollower={isFollower}
        onClick={handleFollow}
    />;

};
