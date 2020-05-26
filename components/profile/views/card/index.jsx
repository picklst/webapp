import React, {useState} from 'react';
import dynamic from "next/dynamic";

import { useGlobalState } from '../../../../actions/states/Auth.ts';

import { Button, Card } from "../../../ui";

import { About, Avatar, Cover } from "../../elements";
import { ProfileEditor, ListRequester, FollowButton } from "../../";

const ListEditor =  dynamic(() => import("../../../list").then(mod => mod.ListEditor));
import StatCard from "./StatCard";

export default ({
     firstName, lastName, username, bio, url, stats,
     isVerified, avatarURL, coverURL,
     requireUpdate
}) => {

    const [myUserData] = useGlobalState('UserInfo');
    const isOwnProfile = myUserData && myUserData.username === username;

    const handleComplete = () => {
        setEditing(false);
        requireUpdate();
    };

    const [isEditing, setEditing] = useState(false);
    const renderEditButton = () =>
        <React.Fragment>
            <Button
                brandAccent
                text="Edit Profile"
                onClick={() => setEditing(true)}
            />
            {isEditing ?
                <ProfileEditor
                    usePopup
                    onComplete={handleComplete}
                    onExit={() => setEditing(false)}
                /> : null
            }
        </React.Fragment>;

    const [isCreating, setCreating] = useState(false);
    const [isRequesting, setRequesting] = useState(false);

    return <Card p={0}>
        <Cover url={coverURL} />
        <div className="row bg-white rounded-bottom mx-0 p-2">
            <div className="col-4 px-2 position-relative">
                <Avatar url={avatarURL} className="position-absolute" />
            </div>
            <div className="col-8 d-flex justify-content-end py-2">
                {
                    !isOwnProfile ?
                        <React.Fragment>
                            <FollowButton username={username} onChange={requireUpdate} />
                            <div className="d-md-block d-none">
                                <Button
                                    text="Request A List"
                                    onClick={() => setRequesting(true)}
                                />
                            </div>
                        </React.Fragment> :
                        <React.Fragment>
                            { renderEditButton() }
                            <div className="d-none d-md-block">
                                <Button
                                    brandAccent
                                    text="Make a List"
                                    onClick={() => setCreating(true)}
                                />
                            </div>
                        </React.Fragment>
                }
            </div>
            <div className="row m-0 w-100">
                <div className="col-md-6 d-flex align-items-center px-2">
                    <About
                        firstName={firstName}
                        lastName={lastName}
                        bio={bio}
                        url={url}
                        username={username}
                        isVerified={isVerified}
                    />
                </div>
                <div className="col-md-6 p-2 mt-md-0 mt-2 d-flex align-items-start justify-content-md-end justify-content-center">
                    <div className="d-flex">
                        <StatCard {...stats} />
                    </div>
                </div>
                <div className="d-md-none d-flex justify-content-center w-100 p-4 my-2">
                    { !isOwnProfile ?
                        <Button
                            brandAccent
                            className="w-100 ml-2"
                            text="Request A List"
                            onClick={() => setRequesting(true)}
                        /> :
                        <Button
                            brandAccent
                            className="w-100 ml-2"
                            text="Make A List"
                            onClick={() => setCreating(true)}
                        />
                    }
                </div>
            </div>
        </div>
        {
            isCreating ?
                <ListEditor
                    isNew
                    onExit={() => setCreating(false)}
                /> : isRequesting ?
                <ListRequester
                    username={username}
                    onComplete={() => setRequesting(false)}
                    onClose={() => setRequesting(false)}
                />
                : null
        }
    </Card>

};