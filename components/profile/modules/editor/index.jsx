import React, {useEffect, useState} from 'react';
import { useBeforeunload } from 'react-beforeunload';

import { getUserAPI } from "../../api"

import { Editor } from '../../views';

import Popup from './Popup';
import {APIPost, APIRequest} from "../../../../utils";
import {createFileFromURI} from "../../../commons";
import {useAuthState} from "../../../../states";

export default ({ usePopup, onComplete, onExit, }) => {
    const [data, setData] = useState(null);
    const [myUserData, setUserInfo] = useAuthState('userInfo');

   useBeforeunload(event => event.preventDefault());

    useEffect(() => {
        if(myUserData && myUserData.username.length > 0) {
            const query = getUserAPI({
                fields: [
                    "firstName", "lastName", "username",
                    "bio", "url", "avatarURL", "coverURL"
                ]
            });
            APIRequest({
                query, variables: {username: myUserData.username}, requireAuth: true
            }).then((r) => {
                setUserInfo(r.user);
                setData(r.user);
            }).catch((e) => {
                console.error("failed loading editor");
            })
        }
    }, []);

    const uploadProfileMedia = async (data) => {
        if(data.avatar && typeof data.avatar === "object" || data.cover && typeof data.cover === "object")
        {
            const d = new FormData();
            if(data.avatar && data.avatar.url && data.avatar.url.startsWith('blob'))
            {
                const avatarFile = await createFileFromURI({ dataURI: data.avatar.url, fileName: 'avatar.jpg' });
                d.append('userAvatar', avatarFile);
            }
            if(data.cover && data.cover.url && data.cover.url.startsWith('blob'))
            {
                const coverFile = await createFileFromURI({ dataURI: data.cover.url, fileName: 'cover.jpg' });
                d.append('userCover', coverFile);
            }
            const query = `mutation { accountMediaUpload }`;
            d.append('query', query);
            return APIPost({data: d, requireAuth: true}).then((r) => {
                return true;
            }).catch((e) => console.error("upload error"));
        }
    };

    const updateProfile = async (variables) => {
        const query = `
        mutation update_account($profile: UserUpdationInput!)
        {
          accountUpdate(input: $profile)
          {
             returning { 
                username 
                firstName
                lastName
                avatarURL
                coverURL
                
             }
          }
        }`;
        return await APIRequest({ query, variables, requireAuth: true}).then((data) => {
            console.log(data);
            return { success: true, data }
        }).catch((errors) => {
            return { success: false, errors}
        })
    };

    const [isSaving, setSaving] = useState(false);
    const handleSave = async () => {
        setSaving(true);
        await uploadProfileMedia(data);
        updateProfile({
            profile: {
                firstName: data.firstName,
                lastName: data.lastName,
                bio: data.bio,
                url: data.url,
                username: myUserData.username
            }
        }).then(({ success, data, errors}) => {
            if(success)
            {
                setUserInfo(data.accountUpdate.returning);
                onComplete({
                    ...data.accountUpdate.returning,
                    avatarURL: '',
                    coverURL: ''
                })
            }
        });
    };

    const renderEditor = () =>
    isSaving ? <h5>Saving Changes</h5>
    : <Editor onChange={setData} {...data} />;

    const renderEditorWrapper = () =>
    usePopup ?
        <Popup onClose={onExit} onSave={handleSave}>
            {renderEditor()}
        </Popup>
    : renderEditor();

    return data && data.username !== null ? renderEditorWrapper() : null;


};