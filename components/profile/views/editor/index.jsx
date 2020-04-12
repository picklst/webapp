import React, {useEffect, useState} from 'react';

import TextInput from "../../../forms/TextInput";
import { Avatar, Cover } from "../../elements";

const Editor = ({
    coverURL, avatarURL, firstName, lastName, bio, url,
    onChange,
}) =>
{
    const [avatar, setAvatar] = useState(avatarURL ? avatarURL : null);
    const [cover, setCover] = useState(coverURL ? coverURL : null);
    const [FN, setFN] = useState(firstName ? firstName : '');
    const [LN, setLN] = useState(lastName ? lastName : '');
    const [biography, setBiography] = useState(bio ? bio : '');
    const [link, setLink] = useState(url ? url : '');

    useEffect(() => {
        if(typeof  onChange === 'function')
            onChange({
                avatar,
                cover,
                firstName: FN,
                lastName: LN,
                bio: biography,
                url: link,
            })
    }, [avatar, cover, FN, LN, biography, link]);

    return <div>
        <Cover
            url={typeof cover === "object" ? cover.url : cover}
            onChange={setCover}
            showEditButton
        />
        <div className="row bg-white rounded-bottom mx-0 px-4 mb-4">
            <div className="col-6 px-2 position-relative">
                <Avatar
                    showEditButton
                    url={typeof avatar === "object" ? avatar.url : avatar}
                    onChange={setAvatar}
                />
            </div>
        </div>
        <div className="row mx-0 p-2 mb-4">
            <div className="col-md-6 p-2">
                <TextInput
                    label="First Name"
                    name="firstName"
                    placeholder="Enter Your First Name"
                    value={FN}
                    onChange={setFN}
                    minimal
                />
            </div>
            <div className="col-md-6 p-2">
                <TextInput
                    label="Last Name"
                    name="lastName"
                    placeholder="Enter Your Last Name"
                    value={LN}
                    onChange={setLN}
                    minimal
                />
            </div>
            <div className="col-12 p-2">
                <TextInput
                    label="Bio"
                    name="bio"
                    placeholder="Write something about you"
                    value={biography}
                    onChange={setBiography}
                    type="textarea"
                    charLimit={200}
                    showLimit
                    minimal
                />
            </div>
            <div className="col-12 p-2">
                <TextInput
                    label="Link"
                    name="link"
                    placeholder="URL to your blog or website"
                    value={link}
                    onChange={setLink}
                    type="url"
                    charLimit={200}
                    showLimit
                    minimal
                />
            </div>
        </div>
    </div>;
};

export default Editor;