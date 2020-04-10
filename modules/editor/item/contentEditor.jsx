import React, {useState} from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import LinkAttacher from "../link/attacher";
import LinkPreview from "../link/preview";
import MediaUploader from "../media/uploader";
import ListEditorContentTypeSelector from "../content/TypeSelector";
import CommentInput from "../content/CommentInput";
import NameInput from "../content/NameInput";
import MediaPreview from "../media/preview";
import Button from "../../../components/ui/Button";

const defaultLabels = {
    save: "Save"
};

const ListItemContentEditor = ({
    itemKey, title, description, url: link, media, entityID,
    labels = defaultLabels,
    enableSaving = false,
    onChangeTitle, onChangeDescription, onURLInput, onChangeMedia, onSave
}) => {

    const [id, setID] = useState(shortid.generate());

    const [descriptionEditor, showDescriptionEditor] = useState(description ? description : '');
    const [linkEditor, showLinkEditor] = useState(!!url);

    const [name, setName] = useState(title ? title : '');
    const [comment, setComment] = useState(description ? description : '');
    const [url, setURL] = useState(link ? link : '');

    const handleNameChange = (v) => { setName(v); onChangeTitle(v); };
    const handleCommentChange = (v) => { setComment(v); onChangeDescription(v) };
    const handleURLChange = (v) => { setURL(v); onURLInput(v) };

    const getHashTags = () => {
        const hashtagRegex = /([#][\w-\d|.]+)/g;
        let dTags = comment.match(hashtagRegex);
        let tTags = name.match(hashtagRegex);
        tTags = tTags ? tTags : [];
        dTags = dTags ? dTags : [];
        return [...new Set([...tTags ,...dTags])];
    };

    const handleSave = () => {
        onSave({
            itemKey,
            name,
            comment,
            url,
            tags: getHashTags()
        });
    };

    return <div>
        <NameInput
            onChange={handleNameChange}
            value={name}
        />
        { media ? <MediaPreview type={media.type} url={media.url} onDelete={() => onChangeMedia(null)} /> : null }
        { url ? <LinkPreview onDelete={() => onURLInput(null)} url={url}/> : null }
        {
            descriptionEditor ? <CommentInput
                id={`list-editor-description-input-${id}`}
                value={comment}
                onChange={handleCommentChange}
                enableUserMentioning
            /> : null
        }
        <LinkAttacher
            isOpen={linkEditor && !url}
            onClose={() => showLinkEditor(false)}
            onComplete={handleURLChange}
        />
        <div className="py-2">
            <ListEditorContentTypeSelector
                types={[
                    {
                        "text": "📄 Text",
                        "isActive": !description && !descriptionEditor,
                        "onSelect": () => showDescriptionEditor(true),
                    },
                    {
                        "text": "🔗 Link",
                        "isActive": !url,
                        "onSelect": () => showLinkEditor(true),
                    },
                    {
                        "isActive": !media,
                        "customButton": <MediaUploader
                            onComplete={onChangeMedia}
                        />
                    },
                ]}
            />
        </div>
        {
            enableSaving ?
                <Button
                    className="purple-button"
                    text={labels.save}
                    onClick={handleSave}
                /> : null
        }
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
    labels: {
        save: PropTypes.string
    },
    enableSaving: PropTypes.bool,
    onChangeTitle: PropTypes.func,
    onChangeDescription: PropTypes.func,
    onURLInput: PropTypes.func,
};

export default ListItemContentEditor;