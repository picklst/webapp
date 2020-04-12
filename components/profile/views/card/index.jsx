import React, {useState} from 'react';
import { useGlobalState } from '../../../../actions/states/Auth.ts';

import Card from "../../../ui/Cards";
import Button from "../../../ui/Button";

import { About, Avatar, Cover } from "../../elements";
import { ProfileEditor, ListRequester } from "../../";

import ListEditor from "../../../../modules/editor/ListEditor";
import StatCard from "./StatCard";

export default ({
     firstName, lastName, username, bio, url, stats,
     isVerified, avatarURL, coverURL,
}) => {

    const [myUserData] = useGlobalState('userData');
    const isOwnProfile = myUserData && myUserData.username === username;

    const [isEditing, setEditing] = useState(false);
    const renderEditButton = () =>
        <React.Fragment>
            <Button
                className="btn no-shadow btn-info px-4 rounded"
                text="Edit Profile"
                onClick={() => setEditing(true)}
            />
            {
                isEditing ?
                    <ProfileEditor
                        usePopup
                        onComplete={() => setEditing(false)}
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
                <Avatar url={avatarURL} />
            </div>
            <div className="col-8 d-flex justify-content-end py-2">
                {
                    !isOwnProfile ?
                        <React.Fragment>
                            <Button
                                className="btn no-shadow btn-info px-4 rounded"
                                text="Follow"
                            />
                            <div className="d-md-block d-none">
                                <Button
                                    className="btn ml-2 no-shadow btn-primary px-4 rounded"
                                    text="Request A List"
                                    onClick={() => setRequesting(true)}
                                />
                            </div>
                        </React.Fragment> :
                        <React.Fragment>
                            { renderEditButton() }
                            <div className="d-none d-md-block">
                                <Button
                                    className="btn no-shadow btn-primary ml-2 px-4 rounded"
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
                            className="btn btn-block btn-primary ml-2 px-4 rounded"
                            text="Request A List"
                            onClick={() => setRequesting(true)}
                        /> : <Button
                            className="btn btn-block btn-primary ml-2 px-4 rounded"
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