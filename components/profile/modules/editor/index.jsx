import React, {useEffect, useState} from 'react';

import {useGlobalState} from "../../../../actions/states/Auth.ts";
import uploadMediaAPI from "../../../../actions/api/uploadMedia.ts";
import getUserAPI from "../../api/getUser.ts";
import updateProfileAPI from "../../api/updateProfile.ts";


import { Editor } from '../../views';

import Popup from './Popup';

export default ({ usePopup, onComplete, onExit, }) => {
    const [data, setData] = useState(null);
    const [myUserData] = useGlobalState('userData');

    const [isQueried, setQueried] = useState(false);
    useEffect(() => {
        if(!isQueried) {
            if(myUserData && myUserData.username.length > 0)
                getUserAPI({
                    username: myUserData.username,
                    fields: [
                        "firstName", "lastName", "username",
                        "bio", "url", "avatarURL", "coverURL"
                    ]
                }).then((r) => {
                    setQueried(true);
                    setData(r);
                });
        }

    });

    const [isSaving, setSaving] = useState(false);
    const handleSave = () => {
        setSaving(true);
        if(typeof data.avatar == "object")
        {
            uploadMediaAPI({ image: data.avatar, type: 'userAvatar'}).then(r => {
                console.log(r);
            });
        }
        if(typeof data.cover == "object")
        {
            uploadMediaAPI({ image: data.cover, type: 'userCover'}).then(r => {
                console.log(r);
            });
        }
        updateProfileAPI({
            firstName: data.firstName,
            lastName: data.lastName,
            bio: data.bio,
            url: data.url,
            username: myUserData.username
        }).then(r => {
            console.log(r);
        });
        setSaving(false);
        onComplete({
            ...data,
            avatarURL: '',
            coverURL: ''
        })
    };

    const renderEditor = () =>
    isSaving ?
        <h1>Saving</h1>
    : <Editor
        onChange={setData}
        {...data}
    />;

    const renderEditorWrapper = () =>
    usePopup ?
        <Popup
            onClose={onExit}
            onSave={handleSave}
        >
            {renderEditor()}
        </Popup>
    : renderEditor();

    return data && data.username !== null ?
        renderEditorWrapper()
    : <div>Loading</div>


};