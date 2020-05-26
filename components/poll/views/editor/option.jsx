import React, {useEffect, useState} from "react"
import shortid from "shortid";

import {Button, TextInput} from "../../../ui";
import {MediaCard} from "../../../media";

export default ({ id, name: nameProp, media: mediaProp, allowEditing, isEditing, onChange, onEdit, onDelete }) => {

    const [name, setName] = useState(nameProp);
    const [media, setMedia] = useState(mediaProp);

    const [showMediaAttacher, setMediaAttacher] = useState(mediaProp ? !!mediaProp : false);

    const handleNameChange = (value) => { setName(value); };

    useEffect(() => {
        if(name !== nameProp || media !== mediaProp)
            onChange({ id, name, media, })
    }, [name, media]);

    const renderMedia = () => showMediaAttacher &&
    <MediaCard
        allowEditing={isEditing}
        allowSave
        isAttaching={media===null}
        media={media}
        onAttach={setMedia}
        onDelete={() => { setMediaAttacher(false); setMedia(null); }}
        onCancel={() => { setMediaAttacher(false); }}
    />;

    return <div className="bg-white rounded d-flex p-1 mb-2">
        <div style={{ width: "75%" }} className="p-1">
        {   isEditing ?
            <React.Fragment>
                {showMediaAttacher &&
                    <div className="mb-2 p-2" style={{ width: "200px" }}>
                        {renderMedia()}
                    </div>
                }
                <TextInput
                    label="Name / Title for Your Option"
                    placeholder="enter text for this option"
                    name="option"
                    className="w-100"
                    id={`item-poll-option-input-${shortid.generate()}`}
                    isRequired
                    errorText="Please enter some text for this option, or kindly remove it."
                    onChange={handleNameChange}
                    autoComplete="off"
                    minimal
                    hideLabel
                    showLimit={false}
                    type="text"
                    value={name ? name : ''}
                    autoFocus
                    charLimit={50}
                />
            </React.Fragment> :
            <div className="row m-0">
                {media && <div className="col-2 px-2">
                    {renderMedia()}
                </div>}
                <div className="col d-flex align-items-center px-0">
                    {name}
                </div>
            </div>
        }
        </div>
        {   allowEditing &&
            <div style={{width: "25%"}} className="d-flex align-items-center justify-content-end px-1">
                {
                    !isEditing ?
                    <Button
                        title="Edit Option"
                        className="p-2 small"
                        text="Edit"
                        onClick={() => onEdit(id)}
                    /> : !showMediaAttacher ?
                    <Button
                        title="Attach Media"
                        className="p-2 text-primary"
                        text={<i className="gg-image"/>}
                        onClick={() => setMediaAttacher(true)}
                    /> : null
                }
                <Button
                    title="Delete Option"
                    className="p-2 text-danger"
                    text={<i className="gg-trash"/>}
                    onClick={onDelete}
                />
            </div>
        }
    </div>;

};