import React, {useState} from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import TextInput from "../../../components/forms/TextInput";
import SwipeList from "../../../components/ui/SwipeList";
import Button from "../../../components/ui/Button";
import LinkAttacher from "../link/attacher";
import LinkPreview from "../link/preview";
import MediaUploader from "../media/uploader";
import dataFetch from "../../../utils/dataFetch";

const AttachmentTypeButton = ({ text, onClick }) => {
    return <Button
        className="plain-button bg-light rounded-pill no-shadow text-dark px-3 py-1"
        onClick={onClick}
        text={
            <div className="small">
                {text}
            </div>
        }
    />
};

const ListItemContentEditor = ({
    title, description, url, media, entityID,
    onChangeTitle, onChangeDescription, onURLInput, onChangeMedia
}) => {

    const [id, setID] = useState(shortid.generate());

    const [descriptionEditor, showDescriptionEditor] = useState(description);
    const [linkEditor, showLinkEditor] = useState(url);
    const searchUser = async (query, variables) => await dataFetch({ query, variables }).then(res => res);

    const [mentionSuggestions, setMentionSuggestions] = useState([]);


    const handleSearchUser = (str) => {
        const query = `query searchUser($key: String!){
          searchUser(key: $key)
          {
            name
            avatar
            value: username
          }
        }`;
        const variables = { key: str.substring(1) };
        searchUser(query, variables).then((r) => {
            if(r.data)
            {
                const data = r.data.searchUser;
                setMentionSuggestions(data);
            }
        })
    };

    const getAttachmentTypesList = () => {
        const list = [];

        !description && !descriptionEditor ? list.push(
            <AttachmentTypeButton
                text="📄 Desc"
                onClick={() => { showDescriptionEditor(true) }}
            />
        ) : null;

       !url ? list.push(
            <AttachmentTypeButton
                text="🔗 Link"
                onClick={() => showLinkEditor(true)}
            />
        ) : null;

       !media ? list.push(
            <MediaUploader onComplete={onChangeMedia} />
       ) : null;

        return list;
    };

    return <div>
        {
            media ?
                <div className="p-2 w-100">
                    {
                        media.type === 'image' ?
                            <img src={media.file} alt="list-item-image" style={{ maxWidth: '100%' }} />
                        : null
                    }
                </div>
                : null
        }
        <TextInput
            label="Name / Title"
            placeholder="Enter name or title"
            name="title"
            id={`list-editor-title-input-${id}`}
            isRequired
            errorText="You need to provide a name or title for the item."
            onChange={onChangeTitle}
            autoComplete="off"
            minimal
            type="text"
            value={title}
            charLimit={100}
            autoFocus
            suggesters={[
                {
                    'regex': /([@][\w-\d|.]+$)/g,
                    'suggestions': mentionSuggestions,
                    'onEnter': handleSearchUser,
                }
            ]}
        />
        {
            url ?
                <LinkPreview
                    onDelete={() => onURLInput(null)}
                    url={url}
                />
            : null
        }
        {
            descriptionEditor ?
                <TextInput
                    label="Description"
                    placeholder="Write here whatever you feel about this item..."
                    name="description"
                    id={`list-editor-description-input-${id}`}
                    onChange={onChangeDescription}
                    minimal
                    type="textarea"
                    value={description}
                    isRequired={false}
                    charLimit={250}
                    rows={3}
                    className="mt-2"
                    suggesters={[
                        {
                            'regex': /([@][\w-\d|.]+$)/g,
                            'suggestions': mentionSuggestions,
                            'onEnter': handleSearchUser,
                        }
                    ]}
                    highlighters={[
                        {
                            'regex': /([@][\w-\d|.]+)/g,
                            'className': 'user-mentions',
                        },
                        {
                            'regex': /([#][\w-\d|.]+)/g,
                            'className': 'hashtags',
                        }
                    ]}
                    enableUserMentions
                    userSuggestions={mentionSuggestions}
                /> : null
        }
        <LinkAttacher
            isOpen={linkEditor && !url}
            onClose={() => showLinkEditor(false)}
            onComplete={onURLInput}
        />
        <div className="py-2">
            <SwipeList
                width="auto"
                items={getAttachmentTypesList()}
            />
        </div>
    </div>
};

ListItemContentEditor.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    url: PropTypes.string,
    media: PropTypes.shape({
        type: PropTypes.string,
        file: PropTypes.any,
    }),
    entityID: PropTypes.string,
    onChangeTitle: PropTypes.func,
    onChangeDescription: PropTypes.func,
    onURLInput: PropTypes.func,
};

export default ListItemContentEditor;