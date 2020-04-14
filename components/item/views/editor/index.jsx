import React, {useEffect, useState} from 'react';

import NameInput from "../../../../modules/editor/content/NameInput";
import CommentInput from "../../../../modules/editor/content/CommentInput";
import LinkAttacher from "../../../../modules/editor/link/attacher";

import ListEditorContentTypeSelector from "../../../../modules/editor/content/TypeSelector";

import { MediaUploaderModule, MediaPreview } from "../../../media";

import Button from "../../../ui/Button";

export default ({
    name: nm, comment: cm, url: ul, media: md,
    labels,
    showSaveButton,
    onChange, onSave
}) => {

    const [name, setName] = useState(nm ? nm : '');
    const [comment, setComment] = useState(cm ? cm : '');
    const [url, setURL] = useState(ul ? ul : '');
    const [media, setMedia] = useState(md ? md : '');

    useEffect(() => {
        if(typeof onChange === "function")
            onChange({
                name,
                comment,
                url,
                media
            })
    }, [name, comment, url]);

    const handleSave = () => {
        onSave({
            name,
            comment,
            url,
            media
        })
    };

    const [showCommentEditor, setCommentEditor] = useState(cm ? cm : '');
    const [showLinkAttacher, setLinkAttacher] = useState(!!url);

    return <div>
        <NameInput
            onChange={setName}
            value={name}
        />
        { media ? <MediaPreview type={media.type} url={media.url} onDelete={() => setMedia(null)} /> : null }
        { showCommentEditor ?
            <CommentInput
                id={`list-editor-description-input`}
                value={comment}
                onChange={setComment}
                enableUserMentioning
            /> : null
        }
        <LinkAttacher
            isOpen={showLinkAttacher && !url}
            onClose={() => setLinkAttacher(false)}
            onComplete={setURL}
        />
        <div className="py-2">
            <ListEditorContentTypeSelector
                types={[
                    {
                        "text": "📄 Text",
                        "isActive": !comment && !showCommentEditor,
                        "onSelect": () => setCommentEditor(true),
                    },
                    {
                        "text": "🔗 Link",
                        "isActive": !url,
                        "onSelect": () => setLinkAttacher(true),
                    },
                    {
                        "isActive": !media,
                        "customButton":
                        <MediaUploaderModule
                            onComplete={setMedia}
                        />
                    },
                ]}
            />
        </div>
        {
            showSaveButton ?
                <Button
                    className="purple-button"
                    text={labels.save}
                    onClick={handleSave}
                /> : null
        }
    </div>
};