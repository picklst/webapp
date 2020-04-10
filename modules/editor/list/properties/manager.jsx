import React, {useState} from 'react';

import ListSettingsEditor from "./settings";

import NameInput from "../../content/NameInput";
import CommentInput from "../../content/CommentInput";
import ListEditorContentTypeSelector from "../../content/TypeSelector";

import '../../../../styles/list/list-creator.sass';


import ListPropertyEditorWrapper from "./wrapper";
import MediaUploader from "../../media/uploader";
import MediaPreview from "../../media/preview";

const ListPropertiesManager = ({
    name: nm, comment, properties: prop, cover: cv,
    isPreview, isNew,
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

    const [name, setName] = useState(nm ? nm : '');
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
            isPreview={isPreview || isPropertiesSet}
            isNew={!isPropertiesSet}
            onRequestEdit={() => setPropertiesEditor(false)}
            onChange={setProperties}
            onSubmit={() => {
                setPropertiesEditor(true);
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
                    console.log('HELLO');
                    setName('Untitled List');
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
        { cover ? <MediaPreview type={cover.type} url={cover.url} onDelete={() => setCover(null)} /> : null }
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