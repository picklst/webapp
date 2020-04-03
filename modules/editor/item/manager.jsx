import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import ListItemEditorHeader from "./header";
import ListItemContentEditor from "./contentEditor";

import "../../../styles/list/item-editor.sass";
import Card from "../../../components/ui/Cards";

const ListItemManager = ({
    data, index, totalItems,
    allowDeletion = true, isOpen = false, isRanked = false, isReordering = false,
    onChange, onOpen, onDelete, onMoveUp, onMoveDown
}) => {

    const [title, setTitle] = useState(data.title);
    const [description, setDescription] = useState(data.description);
    const [url, setURL] = useState(data.url);
    const [media, setMedia] = useState(data.media);
    const [entityID, setEntityID] = useState(data.entityID);

    const [TMentions, setTMentions] = useState([]);
    const [TTags, setTTags] = useState([]);
    const [DMentions, setDMentions] = useState([]);
    const [DTags, setDTags] = useState([]);

    const [updateRequired, setUpdateRequired] = useState(false);
    useEffect(() => {
        if(updateRequired){
            sendData();
            setUpdateRequired(false);
        }
    });

    const sendData = () => {
        if(typeof onChange === "function")
            onChange({
                title,
                description,
                url,
                mentions: [...new Set([...DMentions, ...TMentions])],
                tags: [...new Set([...DTags, ...TTags])],
                media,
                entityID
            });
    };

    const getMentions = (val) => {
        const userMentionRegex = /([@][\w-\d|.]+)/g;
        let mentions = val.match(userMentionRegex);
        if(mentions && mentions.length > 0)
        {
            mentions = mentions.map(s => s.slice(1));
            return mentions;
        }
        return  [];
    };

    const getHashTags = (val) => {
        const hashTagRegex = /([#][\w-\d|.]+)/g;
        let hashTags = val.match(hashTagRegex);
        if(hashTags && hashTags.length > 0)
        {
            hashTags = hashTags.map(s => s.slice(1));
            return hashTags;
        }
        return [];
    };

    const handleTitleInput = (val) => {
        setTMentions(getMentions(val));
        setTTags(getHashTags(val));
        setTitle(val);
        setUpdateRequired(true);
    };

    const handleDescriptionInput = (val) => {
        setDMentions(getMentions(val));
        setDTags(getHashTags(val));
        setDescription(val);
        setUpdateRequired(true);
    };

    const handleURLInput = (val) => {
        setURL(val);
        setUpdateRequired(true);
    };

    const handleMediaInput = (val) => {
        setMedia(val);
        setUpdateRequired(true);
    };

    const renderCollapsedItem =
    <div className="d-flex align-items-center ml-2">
        <h5 className="m-0">{title ? title : 'Untitled Item'}</h5>
    </div>;

    const renderItemCard =
    <Card className={classNames("list-item-editor", !isReordering ? "rounded my-3" : "rounded-right-0" )} p={2}>
        <ListItemEditorHeader
            index={index}
            totalItems={totalItems}
            itemID={data.itemID}
            isOpen={isOpen && !isReordering}
            isRanked={isRanked}
            allowDeletion={allowDeletion}
            allowEditing={!isReordering}
            onMoveUp={onMoveUp}
            onMoveDown={onMoveDown}
            onDelete={onDelete}
            onOpen={onOpen}
        />
        { isOpen && !isReordering ?
            <ListItemContentEditor
                title={title}
                description={description}
                url={url}
                media={media}
                entityID={entityID}
                onChangeTitle={handleTitleInput}
                onChangeDescription={handleDescriptionInput}
                onChangeMedia={handleMediaInput}
                // onFetchURL={(d) => handleLinkLoaded(d)}
                // onDeleteURL={() => handleURLInput(null)}
                onURLInput={handleURLInput}
                // onEntityInput={handleEntityInput}
            />
            : renderCollapsedItem
        }
    </Card>;

    return <div>
        { renderItemCard }
    </div>
};

ListItemManager.propTypes = {
    data: PropTypes.shape({
        itemID: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string,
        url: PropTypes.string,
        mentions: PropTypes.arrayOf(PropTypes.string),
        media: PropTypes.shape({
           type: PropTypes.string,
           file: PropTypes.any,
        }),
        entityID: PropTypes.string,
    }).isRequired,
    index: PropTypes.number.isRequired,
    isOpen: PropTypes.bool,
    allowDeletion: PropTypes.bool,
    isReordering: PropTypes.bool,
    totalItems: PropTypes.number,
    onChange: PropTypes.func,
    onOpen: PropTypes.func,
    onDelete: PropTypes.func,
    onMoveUp: PropTypes.func,
    onMoveDown: PropTypes.func,
    onDragStart: PropTypes.func,
    onDragEnd: PropTypes.func
};

export default ListItemManager;