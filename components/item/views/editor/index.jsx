import React, {useEffect, useState} from 'react';

import { Button, Card } from "../../../ui";
import {NameInput, CommentInput, TypeSelector} from "../../../editors";
import {LinkAttacher, LinkPreviewCard} from "../../../link";
import { MediaCard } from "../../../media";

import { PollCard } from "../../../poll";

import EditorHeader from "./header";
import { containsURL } from "../../../../data/regexValidators";

export default ({
    id, slug, index, totalItems,
    name: nm, comment: cm, url: ul, media: md, poll: pll,
    labels, className,
    showSaveButton = true, showDeleteButton = true, showMoveButtons = true,
    onChange, onMoveUp, onMoveDown, onDelete, onSave, onClose, requireUpdate
}) => {

    const [name, setName] = useState(nm ? nm : '');
    const [comment, setComment] = useState(cm ? cm : '');
    const [url, setURL] = useState(ul ? ul : '');
    const [media, setMedia] = useState(md ? md : '');
    const [poll, setPoll] = useState(pll ? pll : null);

    useEffect(() => {
        if(typeof onChange === "function")
            onChange({ name, comment, url, media, poll })
    }, [name, comment, url, media, poll]);

    const handleSave = () => onSave({ name, comment, url, media, poll });

    const [showCommentEditor, setCommentEditor] = useState(cm ? cm : '');
    const [showLinkAttacher, setLinkAttacher] = useState(false);
    const [showMediaAttacher, setMediaAttacher] =  useState(md ? md : false);
    const [showPollEditor, setPollEditor] = useState(pll ? pll : false);

    const [cancelButton, showCancelButton] = useState(true);

    const containsLink = (content) => !!content.match(containsURL);

    const handleSuggestSelect = (content) => { setURL(content.match(containsURL)[0]); };
    const renderLinkSuggester = (content) =>
    <div className="small line-height-1 my-3">
        {
            url === '' || !url ?
            <React.Fragment>
                Would you like to attach that link to this item?
                <Button
                    onClick={() => handleSuggestSelect(content)}
                    className="plain-button font-weight-bold text-primary p-0"
                    text="Attach Link"
                />
            </React.Fragment> :
            url !== content.match(containsURL)[0] ?
            <React.Fragment>
                Would you like to attach this link to this item? But, then you wouldn't be able attach the current link.
                <Button
                    onClick={() => handleSuggestSelect(content)}
                    className="plain-button font-weight-bold text-primary p-0"
                    text="Attach this Link Instead"
                />
            </React.Fragment> : null
        }

    </div>;

    return <Card className={className} p={3}>
        <EditorHeader
            id={id}
            slug={slug}
            index={index}
            totalItems={totalItems}
            showDeleteButton={showDeleteButton}
            showMoveButtons={showMoveButtons}
            onMoveUp={onMoveUp}
            onMoveDown={onMoveDown}
            allowSave={showSaveButton}
            onDelete={onDelete}
            requireUpdate={requireUpdate}
        />
        <div className="mb-2">
            <div className="mb-2">
                <NameInput onChange={setName} value={name} />
                { name && containsLink(name) ? renderLinkSuggester(name) : null }
            </div>
            { showCommentEditor &&
                <div className="mb-2">
                    <CommentInput
                        value={comment}
                        onChange={setComment}
                        enableUserMentioning
                    />
                    { comment && containsLink(comment) ? renderLinkSuggester(comment) : null }
                </div>
            }
            {   showMediaAttacher &&
                <div className="mb-2">
                    <MediaCard
                        allowEditing
                        allowSave
                        isAttaching={media===''}
                        media={media}
                        onAttach={(media) => { setMedia(media); showCancelButton(false) }}
                        onDelete={() => { setMediaAttacher(false); setMedia(''); showCancelButton(false); }}
                        onCancel={() => { setMediaAttacher(false); showCancelButton(false); }}
                    />
                </div>
            }
            {   url &&
                <div className="mb-2">
                    <LinkPreviewCard url={url} showDeleteButton onDelete={() => setURL('')} />
                </div>
            }
            {
                showLinkAttacher &&
                <LinkAttacher
                    isOpen={showLinkAttacher && url === ''}
                    onClose={() => setLinkAttacher(false)}
                    onComplete={(url) => { setLinkAttacher(false); setURL(url)}}
                />
            }
            {
                showPollEditor &&
                <div className="mb-2">
                    <PollCard
                        data={poll}
                        isCreating={poll===null}
                        isEditing
                        onClose={() => setPollEditor(false)}
                        onComplete={(poll) => { setPoll(poll); }}
                        onDelete={() => { setPollEditor(false);  setPoll(null); showCancelButton(false); }}
                    />
                </div>
            }
        </div>
        <div className="row m-0">
            <div className="col px-0">
                <TypeSelector
                    types={[
                        {
                            "text": <div className="d-flex align-items-center"><i className="gg-format-text" /></div>,
                            "isActive": !comment && !showCommentEditor,
                            "onSelect": () => setCommentEditor(true),
                        },
                        {
                            "text": <div className="d-flex align-items-center"><i className="gg-link" /></div>,
                            "isActive": !url,
                            "onSelect": () => setLinkAttacher(true),
                        },
                        {
                            "text": <div className="d-flex align-items-center"><i className="gg-image" /></div>,
                            "isActive": !media && !showMediaAttacher,
                            "onSelect": () => setMediaAttacher(true),
                        },
                        {
                            "text": <div className="d-flex align-items-center"><i className="gg-poll" /></div>,
                            "isActive": !poll && !showPollEditor,
                            "onSelect": () => setPollEditor(true),
                        },
                    ]}
                />
            </div>
            {   showSaveButton &&
                <div className="col-sm-6 d-flex justify-content-end px-1 py-2">
                    <Button
                        brandAccent
                        text={labels.save}
                        onClick={handleSave}
                    />
                    {cancelButton ?
                        <Button
                            text={labels.close}
                            onClick={onClose}
                        /> : null
                    }
                </div>
            }
        </div>
    </Card>
};