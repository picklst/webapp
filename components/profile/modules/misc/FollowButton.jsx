import React, {useEffect, useState} from 'react';
import { toast } from 'react-toastify';

import {useGlobalState} from "../../../../actions/states/Auth.ts";
import { AuthCard } from '../../../auth'

import {APIRequest} from "../../../../utils";
import Button from "../../../ui/Button";


export default ({ username, onChange }) => {

    const [data] = useGlobalState('UserInfo');
    const isLoggedIn = !!data;

    const [isClicked, setClicked] = useState(false);
    const [isFollower, setFollower] = useState(false);

    const statusCheck = () => {
        if(isLoggedIn)
            isFollowerAPI({ username }).then(({ success, data, errors }) => {
                if(success) setFollower(data && data.isFollower);
            });
    };

    const isFollowerAPI = async (variables) => {
        const query = `query is_follower($username: String!) { isFollower(username: $username) }`;
        return await APIRequest({ query, variables, requireAuth: true }).then((data) => {
            return {success: true, data}
        }).catch((errors) => { return { success: false, errors } });
    };

    const followUnfollowUser =  async (follow, variables) => {
        let query = `mutation unfollow($username: String!) { unfollowUser(username: $username) }`;
        if(follow)
            query = `mutation follow($username: String!) { followUser(username: $username) }`;
        return await APIRequest({ query, variables, requireAuth: true }).then((data) => {
            return {success: true, data}
        }).catch((errors) => { return { success: false, errors } });
    };

    useEffect(() => statusCheck(), []);

    const handleFollow = () => {
          if(!isLoggedIn)
            setClicked(true);
          else {
              followUnfollowUser( !isFollower, { username }).then(({ success, data, errors}) => {
                  if(success)
                  {
                      toast.success(
                          `You are now following @${username}`,
                          {
                              autoClose: 1000, hideProgressBar: true, closeButton: false,
                              position: toast.POSITION.BOTTOM_CENTER,
                          }
                      );
                      setFollower(!isFollower);
                  } else {
                      toast.error(
                          "An unknown error occurred. Please try again.",
                          {
                              autoClose: 1000, hideProgressBar: true, closeButton: false,
                              position: toast.POSITION.BOTTOM_CENTER,
                          }
                      );
                  }
              });
          }
    };

    return isClicked && !isLoggedIn ?
    <AuthCard
        variant="bottom-popup"
        onClose={() => setClicked(false)}
        onComplete={handleFollow}
    /> :
    <Button
        brandAccent={!isFollower}
        text={ isFollower ? "Following" : "Follow" }
        onClick={handleFollow}
    />;

};
