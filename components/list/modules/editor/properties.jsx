import React, {useState} from "react";

import { SettingEditor, SettingPreview, PropertyWrapper } from "../../views/";
import { NameInput, CommentInput, TypeSelector } from "../../../editors";
import { MediaPreview, MediaUploaderModule } from "../../../media";
import { TopicSelector } from "../../../topics";

const emptyFunc = () => {};

export default ({
    name: nameProp, description: descriptionProp, properties: propertiesProp, cover: coverProp, topic: topicProp,
    isInitializing = false,
    onSave = emptyFunc, onSaveName = emptyFunc, onSaveTopic = emptyFunc
}) => {

    const sendUpdate = () => {
        if(typeof onSave === "function")
            onSave({ name, description, properties, topic, cover });
    };

    const [properties, setProperties] = useState(propertiesProp);
    const [isPropertiesSet, setPropertiesEditor] = useState(!!propertiesProp);
    const handleSettingsSkip = () => {
        const defaultProps = {
            isRanked: false,
            isPrivate: false,
        };
        setProperties({...defaultProps});
        setPropertiesEditor(true);
    };
    const renderProperties = () =>
    <PropertyWrapper
        propertyName="Setting"
        isEditing={!isPropertiesSet}
        editor={
            <SettingEditor
                properties={properties}
                isNew={!isPropertiesSet && isInitializing}
                onChange={setProperties}
            />
        }
        previewer={<SettingPreview properties={properties}/>}
        isPreview={isPropertiesSet}
        onRequestEdit={() => setPropertiesEditor(false)}
        showSkip={!properties}
        onSkip={handleSettingsSkip}
        isInitializing={isInitializing}
        onSave={() => {
            setPropertiesEditor(true);
            sendUpdate();
        }}
    />;

    const [isNamed, setNamed] = useState(!!nameProp);
    const [name, setName] = useState(nameProp);
    const handleNamingSkip = () => {
        setName('Untitled List');
        setNamed(true);
        sendUpdate();
        onSaveName({ name, description, properties, topic});
    };
    const renderName = () =>
    <PropertyWrapper
        propertyName="Name"
        isEditing={!isNamed}
        editor={<NameInput onChange={setName} value={name}/>}
        onRequestEdit={() => setNamed(false)}
        previewer={<h5 className="my-1">{name}</h5>}
        showSkip={!name || name.length < 1}
        isInitializing={isInitializing}
        onSave={() => {
            setNamed(true);
            sendUpdate();
            onSaveName({ name, description, properties, topic})
        }}
        onSkip={handleNamingSkip}
    />;

    const [isTopicSelected, setTopicSelected] = useState(!!topicProp || topicProp && topicProp.slug !== undefined);
    const [topic, setTopic] = useState(topicProp);
    const handleTopicSelect = (t) => topic === t ? setTopic(null) : setTopic(t);
    const handleTopicSkip = () => {
        setTopicSelected(true);
        setTopic(null);
        onSaveTopic({ name, description, properties, topic: null })
    };
    const renderTopic = () => (!isTopicSelected || topic !== null) &&
    <PropertyWrapper
        propertyName="Topic"
        isEditing={!isTopicSelected}
        editor={<TopicSelector selected={topic} onSelect={handleTopicSelect} />}
        onRequestEdit={() => setTopicSelected(false)}
        previewer={topic ? <h6 className="mb-1">{topic.name}</h6> : <h5>Not Selected</h5>}
        showSkip={!topic || topic.slug === undefined}
        isInitializing={isInitializing}
        onSave={() => {
            setTopicSelected(true);
            sendUpdate();
            onSaveTopic({ name, description, properties, topic })
        }}
        onSkip={handleTopicSkip}
    />;


    const [descriptionEditor, showDescriptionEditor] = useState(!!descriptionProp);
    const [isDescriptionSet, setDescriptionEditor] = useState(!!descriptionProp);
    const [description, setDescription] = useState(descriptionProp);
    const renderDescription = () =>
    <PropertyWrapper
        propertyName="Description"
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
            sendUpdate()
        }}
    />;

    const [cover, setCover] = useState(coverProp ? { url: coverProp, type: 'image' } : false);
    const [isCoverSet, setCoverSet] = useState(!!coverProp);
    const handleMediaDelete = () => {
        if(cover.url.startsWith("blob"))
            setCover('');
        else {
            const md = cover;
            md['delete'] = true;
            md['originalURL'] = md['originalURL'];
            setCover({...md});
        }
    };
    const renderCover = () =>
    <PropertyWrapper
        propertyName="Cover"
        isEditing={!isCoverSet}
        onRequestEdit={() => setCoverSet(false)}
        editor={
            <MediaPreview
                type={cover.type}
                url={!cover.delete && cover.url}
                showDeleteButton={!cover.delete}
                onDelete={handleMediaDelete}
            />
        }
        previewer={
            <div className="py-2">
                <MediaPreview type={cover.type} url={cover.url} />
            </div>
        }
        labels={{ "save": "Save" }}
        onSave={() => {
            if(cover && cover.url && cover.url.startsWith("blob"))
            {
                setCoverSet(true);
            } else {
                handleMediaDelete();
                setCover(false);
            }
            sendUpdate();
        }}
    />;

    return <React.Fragment>
        {isPropertiesSet && renderName()}
        {renderProperties()}
        {isPropertiesSet && isNamed && renderTopic()}
        {isPropertiesSet && isNamed &&  isTopicSelected && descriptionEditor && renderDescription()}
        {isPropertiesSet && isNamed &&  isTopicSelected && cover && renderCover()}
        <div className="my-2">
        {   isNamed && isPropertiesSet && isTopicSelected ?
            <TypeSelector
                types={[
                    {
                        "text": <div className="d-flex align-items-center"><i className="gg-hashtag" /></div>,
                        "isActive": topic == null,
                        "onSelect": () => setTopicSelected(false),
                    },
                    {
                        "text": <div className="d-flex align-items-center"><i className="gg-format-text" /></div>,
                        "isActive": !descriptionEditor,
                        "onSelect": () => showDescriptionEditor(true),
                    },
                    {
                        "isActive": !cover,
                        "customButton": <MediaUploaderModule onComplete={setCover} />
                    },
                ]}
            /> : null
        }
        </div>
    </React.Fragment>
}