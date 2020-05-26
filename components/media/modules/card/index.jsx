import React, {useEffect, useState} from "react";

import {createFileFromURI} from "../../../commons";
import {APIPost, APIRequest} from "../../../../utils";

import {Attacher, Preview} from "../../views";

export default ({
    media: mediaProps,
    allowEditing = true, allowSave = false, isAttaching = false,
    onChange, onAttach, onDelete, onCancel,
})  => {

    const [media, setMedia] = useState(mediaProps);

    const uploadMedia = async (blobURL) => {
        const d = new FormData();
        const mediaFile = await createFileFromURI({ dataURI:  blobURL, fileName: 'media.jpg' });
        d.append('media', mediaFile);
        const query = `
        mutation {
          mediaUpload(properties: { aspect: "1",  type: "image" })
          {
            returning
            {
              id
            }
          }
        }`;
        d.append('query', query);
        return await APIPost({data: d, requireAuth: true}).then((data) => {
            return { success: true, data };
        }).catch((errors) => { return { success: false, errors }; });
    };

    const deleteMedia = async (id) => {
        const query = `
        mutation delete_media($id: String!){
          mediaDelete(id: $id)
        }`;
        return await APIRequest({ query, variables: { id } }).then((data) => {
            return { success: true, data };
        }).catch((errors) => {
            return { success: false, errors }
        });
    };

    useEffect(() => handleMediaChange(), [media]);

    const handleMediaChange = () => {
        if(media && media.delete) {
            if(allowSave)
                deleteMedia(media.id).then(() => {
                    if(typeof onDelete === "function")
                        onDelete(media);
                });
            else if(typeof onDelete === "function")
                onDelete(media);
            setMedia(null);
        } else if (media && media.upload) {
            const md = media;
            delete md.upload;
            if(allowSave)
                uploadMedia(media.url).then(({ success, data, errors}) => {
                    if(success)
                    {
                        md['id'] = data.mediaUpload.returning.id;
                        setMedia({...md});
                        if(typeof onAttach === "function")
                            onAttach(md);
                    } else {
                        console.error("failed to upload media");
                        return false;
                    }
                });
            else if(typeof onAttach === "function")
                onAttach(md);
        }
    };

    const handleOnAttach = (data) => {
        data['upload'] = true;
        setMedia(data);
    };

    const handleDelete = () => {
        const md = media;
        delete md.url;
        md['delete'] = true;
        setMedia({...md});
    };

    return allowEditing && isAttaching ? <Attacher onClose={onCancel} onComplete={handleOnAttach} />
    : media ?
    <Preview
        onDelete={handleDelete}
        url={media.url}
        type={media.type}
        altText="Attachment"
        showDeleteButton={allowEditing}
    /> : null;

};
