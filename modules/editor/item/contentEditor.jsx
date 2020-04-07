import React, {useState} from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import LinkAttacher from "../link/attacher";
import LinkPreview from "../link/preview";
import MediaUploader from "../media/uploader";
import ListEditorContentTypeSelector from "../content/TypeSelector";
import CommentInput from "../content/CommentInput";
import NameInput from "../content/NameInput";


const ListItemContentEditor = ({
    title, description, url, media, entityID,
    onChangeTitle, onChangeDescription, onURLInput, onChangeMedia
}) => {

    const [id, setID] = useState(shortid.generate());

    const [descriptionEditor, showDescriptionEditor] = useState(description ? description : '');
    const [linkEditor, showLinkEditor] = useState(!!url);

    return <div>
        <NameInput
            onChange={onChangeTitle}
            value={title}
        />
        {
            media ?
                <div className="p-2 w-100">
                    {
                        media.type === 'image' ?
                            <img
                                src={media.url}
                                alt="list-item-image"
                                style={{ maxWidth: '100%' }}
                            />
                        : null
                    }
                </div>
            : null
        }
        { url ? <LinkPreview onDelete={() => onURLInput(null)} url={url}/> : null }
        {
            descriptionEditor ? <CommentInput
                id={`list-editor-description-input-${id}`}
                value={description}
                onChange={onChangeDescription}
                enableUserMentioning
            /> : null
        }
        <LinkAttacher
            isOpen={linkEditor && !url}
            onClose={() => showLinkEditor(false)}
            onComplete={onURLInput}
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