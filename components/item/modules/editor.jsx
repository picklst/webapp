import React, {useState} from 'react';

import { updateItemAPI, uploadMediaAPI } from "../api";
import { Editor } from '../views'


export default ({
    slug, itemKey, name, url, comment,
    showSaveButton, onSave
}) => {
    const [data, setData] = useState({
        name, comment, url
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
        name={data.name}
        comment={data.comment}
        url={data.url}
        onChange={setData}
        onSave={handleSave}
        showSaveButton={showSaveButton}
        labels={{
            save: 'Save'
        }}
    />
};