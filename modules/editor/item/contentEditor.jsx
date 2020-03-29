import React, {useState} from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import TextInput from "../../../components/forms/TextInput";
import SwipeList from "../../../components/ui/SwipeList";
import Button from "../../../components/ui/Button";
import LinkAttacher from "../link/attacher";
import LinkPreview from "../link/preview";

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
    title, description, url, entityID,
    onChangeTitle, onChangeDescription, onURLInput
}) => {
    const [id, setID] = useState(shortid.generate());

    const [descriptionEditor, showDescriptionEditor] = useState(false);
    const [linkAttacher, showLinkAttacher] = useState(false);
    const [mediaAttacher, showMediaAttacher] = useState(false);

    const getAttachmentTypesList = () => {
        const list = [];

        !descriptionEditor ? list.push(
            <AttachmentTypeButton
                text="📄 Text"
                onClick={() => showDescriptionEditor(true)}
            />
        ) : null;

        !linkAttacher ? list.push(
            <AttachmentTypeButton
                text="🔗 Link"
                onClick={() => showLinkAttacher(true)}
            />
        ) : null;

        !mediaAttacher ? list.push(
            <AttachmentTypeButton
                text="📸 Image"
                onClick={() => showMediaAttacher(true)}
            />
        ) : null;

        return list;
    };

    return <div>
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
            description || descriptionEditor ?
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
                /> : null
        }
        <LinkAttacher
            isOpen={linkAttacher && !url}
            onClose={() => showLinkAttacher(false)}
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
    entityID: PropTypes.string,
    onChangeTitle: PropTypes.func,
    onChangeDescription: PropTypes.func,
    onURLInput: PropTypes.func,
};

export default ListItemContentEditor;