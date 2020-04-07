import React, {useState} from 'react';

import ListSettingsEditor from "./settings";

import NameInput from "../../content/NameInput";
import CommentInput from "../../content/CommentInput";
import ListEditorContentTypeSelector from "../../content/TypeSelector";

import '../../../../styles/list/list-creator.sass';


import ListPropertyEditorWrapper from "./wrapper";
import MediaUploader from "../../media/uploader";

const ListPropertiesManager = ({
    name: nm,
    comment,
    properties: prop,
    cover: cv,
    isPreview,
    onUpdate
}) => {

    const defaultProps = {
        isRanked: false,
        isPrivate: false,
    };

    const [isNamed, setNamed] = useState(isPreview);
    const [isPropertiesSet, setPropertiesEditor] = useState(isPreview);
    const [isDescriptionSet, setDescriptionEditor] = useState(!!comment);

    const [descriptionEditor, showDescriptionEditor] = useState(!!comment);

    const [name, setName] = useState(nm ? nm : 'Untitled List');
    const [description, setDescription] = useState(comment ? comment : '');
    const [properties, setProperties] = useState(prop ? prop : null);
    const [cover, setCover] = useState(cv ? cv : null);

    const handleSubmit = () => {
        if(typeof onUpdate === "function")
            onUpdate({
                name,
                description,
                properties
            });
    };

    return <div>
        <ListSettingsEditor
            properties={properties}
            isPreview={isPropertiesSet}
            isNew={!prop}
            onRequestEdit={() => setPropertiesEditor(false)}
            onChange={setProperties}
            onSubmit={() => {
                setPropertiesEditor(true);
                handleSubmit();
            }}
            onSkip={() => {
                setProperties({...defaultProps});
                setPropertiesEditor(true);
            }}
        />
        { isPropertiesSet ?
            <ListPropertyEditorWrapper
                propertyName="Name"
                isEditing={!isNamed}

                editor={
                    <NameInput
                        onChange={setName}
                        value={name}
                    />
                }
                onRequestEdit={() => setNamed(false)}
                previewer={<h4 className="mb-1">{name}</h4>}
                showSkip={!name && name.length < 1}
                onSave={() => {
                    setNamed(true);
                    handleSubmit(name, description, properties)
                }}
                onSkip={() => {
                    setNamed(true);
                    handleSubmit()
                }}
            /> : null
        }
        {
            isPropertiesSet && isNamed && descriptionEditor ?
                <ListPropertyEditorWrapper
                    propertyName="Comment"
                    isEditing={!isDescriptionSet}
                    editor={
                        <CommentInput
                            id={`list-description-input`}
                            value={description}
                            onChange={setDescription}
                            enableUserMentioning
                        />
                    }
                    onRequestEdit={() => setDescriptionEditor(false)}
                    previewer={description}
                    showSkip={false}
                    onSave={() => {
                        setDescriptionEditor(true);
                        handleSubmit()
                    }}
                /> : null
        }
        {
            cover ?
            <div className="p-2 w-100">
            {
                cover.type === 'image' ?
                    <img
                        src={cover.url}
                        alt="list-cover-image"
                        style={{ maxWidth: '100%' }}
                    />
                    : null
            }
            </div> : null
        }
        {
            isNamed && isPropertiesSet ?
                <ListEditorContentTypeSelector
                    types={[
                        {
                            "text": "📄 Text",
                            "isActive": !descriptionEditor,
                            "onSelect": () => showDescriptionEditor(true),
                        },
                        {
                            "isActive": !cover,
                            "customButton": <MediaUploader
                               onComplete={setCover}
                            />
                        },
                    ]}
                /> : null
        }
    </div>
};

export default ListPropertiesManager;