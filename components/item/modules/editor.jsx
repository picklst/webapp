import React, {useState} from 'react';

import { updateItemAPI, uploadMediaAPI } from "../api";
import { Editor } from '../views'


export default ({
    slug, itemKey, index, totalItems,
    name, url, comment, media,
    className, showSaveButton, onSave
}) => {
    const [data, setData] = useState({
        name, comment, url, media
    });

    const getHashTags = () => {
        const hashtagRegex = /([#][\w-\d|.]+)/g;
        let dTags = data.comment.match(hashtagRegex);
        let tTags = data.name.match(hashtagRegex);
        tTags = tTags ? tTags : [];
        dTags = dTags ? dTags : [];
        return [...new Set([...tTags ,...dTags])];
    };

    const handleSave = (obj) => {
        const currObj = {
            name: data.name,
            comment: data.comment,
            key: itemKey,
            url: data.url,
            tags: getHashTags()
        };
        if(typeof obj.media == "object")
        {
            if(media && media.key && typeof obj.media.key !== media.key)
            uploadMediaAPI(obj.media).then(r => {
                currObj['media'] = r.returning.key;
                updateItemAPI({ object: currObj, slug }).then(r => {
                    if(typeof onSave === 'function')
                        onSave(currObj);
                })
            })
        }
        else {
            updateItemAPI({ object: currObj, slug }).then(r => {
                if(typeof onSave === 'function')
                    onSave(currObj);
            })
        }
    };

    return <Editor
        slug={slug}
        totalItems={totalItems}
        index={index}
        name={data.name}
        comment={data.comment}
        url={data.url}
        media={data.media}
        className={className}
        onChange={setData}
        onSave={handleSave}
        showSaveButton={showSaveButton}
        labels={{ save: 'Save' }}
    />
};