import React, {useEffect, useState} from 'react';
import { toast } from 'react-toastify';

import { Editor } from '../views'
import {APIRequest} from "../../../utils";

const emptyFun = () => {};

const defaultLabels = {
    save: 'Save',
    close: 'Close'
};

export default ({
    slug, id, index, totalItems,
    name, url, comment, media, poll,
    className, labels: labelProps,
    allowSave, showSaveButton, showDeleteButton, showMoveButtons, requireUpdate,
    onSave = emptyFun, onClose = emptyFun, onChange = emptyFun, onMoveUp = emptyFun, onMoveDown = emptyFun, onDelete = emptyFun
}) => {

    const labels = {...defaultLabels, ...labelProps};

    const [data, setData] = useState({ name, comment, url, media, poll });

    useEffect(() => {
        if(typeof onChange === "function")
            onChange({
                name: data.name,
                comment: data.comment,
                id: id,
                media: data.media,
                url: data.url,
                tags: getHashTags(),
                poll: data.poll
            });
    }, [data]);

    const getHashTags = () => {
        const hashtagRegex = /([#][\w-\d|.]+)/g;
        let dTags = data.comment ? data.comment.match(hashtagRegex) : false;
        let tTags = data.name ? data.name.match(hashtagRegex) : false;
        tTags = tTags ? tTags : [];
        dTags = dTags ? dTags : [];
        return [...new Set([...tTags ,...dTags])];
    };

    const updateItem = async (variables) => {
        const query = `
        mutation update_item($slug: String!, $id: String!, $object: ItemInput!){
          itemUpdate(list: { slug: $slug}, id: $id, object: $object)
          {
            returning {
              id
            }
          }
        }`;
        return await APIRequest({ query, variables }).then((data) => {
            return { success: true, data };
        }).catch((errors) => {
            return { success: false, errors }
        });
    };

    const handleSave = async (data) => {
        const object =  {
            name: data.name,
            comment: data.comment,
            url: data.url,
            tags: getHashTags()
        };
        if(data.poll && data.poll.options && data.poll.options.length > 1)
        {
            const poll = {};
            const options = [];
            data.poll.options.forEach(({id, name, media}) => {
                const op = { id, name };
                if(media && media.id) { op['mediaID'] = media.id }
                options.push(op);
            });
            if(data.poll.answer !== null)
                poll['answerID'] = data.poll.answer;
            poll['options'] = options;
            object['poll'] = poll;
        }
        if(data.media && data.media !== '' && data.media.id)
            object['mediaID'] = data.media.id;
        if(allowSave)
        {
            updateItem({ slug, id, object }).then(({ success, errors, data }) => {
                if(success)
                {
                    toast.success(
                        "Saved successfully",
                        {
                            autoClose: 1000, hideProgressBar: true, closeButton: false,
                            position: toast.POSITION.BOTTOM_CENTER,
                        }
                    );
                    onSave(data.returning);
                } else {
                    toast.error(
                        "Could not save due to an unknown error. Please try again.",
                        {
                            autoClose: 1000, hideProgressBar: true, closeButton: false,
                            position: toast.POSITION.BOTTOM_CENTER,
                        }
                    );
                }
            })
        } else { onSave(object); }
    };

    return <Editor
        id={id}
        slug={slug}
        totalItems={totalItems}
        index={index}

        name={data.name}
        comment={data.comment}
        url={data.url}
        media={data.media}
        poll={data.poll}

        className={className}
        labels={labels}
        showSaveButton={showSaveButton||allowSave}
        showDeleteButton={showDeleteButton}
        showMoveButtons={showMoveButtons}
        onChange={setData}
        onSave={handleSave}
        onClose={onClose}
        onDelete={onDelete}
        onMoveDown={onMoveDown}
        onMoveUp={onMoveUp}
        requireUpdate={requireUpdate}
    />
};