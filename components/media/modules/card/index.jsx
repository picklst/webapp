import React, {useEffect, useState} from "react";
import { toast } from 'react-toastify';

import {createFileFromURI} from "../../../commons";
import {APIPost, APIRequest} from "../../../../utils";

import {Attacher, Preview} from "../../views";
import { PopUp } from "../../../ui";
import {clearAllBodyScrollLocks} from "body-scroll-lock";

export default ({
    media: mediaProps, aspect, lockAspectRatio,
    allowEditing = true, allowSave = false, isAttaching = false,
    onChange, onAttach, onDelete, onCancel,
})  => {

    const [media, setMedia] = useState(mediaProps);
    const [isUploading, setUploading] = useState(false);

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
            setUploading(true);
            const md = media;
            delete md.upload;
            if(allowSave)
                uploadMedia(media.url).then(({ success, data, errors}) => {
                    setUploading(false);
                    if(success)
                    {
                        md['id'] = data.mediaUpload.returning.id;
                        setMedia({...md});
                        clearAllBodyScrollLocks();
                        if(typeof onAttach === "function")
                            onAttach(md);
                    } else {
                        toast.error(
                            "Could not upload media due to an unknown error. Please try again.",
                            {
                                autoClose: 1000, hideProgressBar: true, closeButton: false,
                                position: toast.POSITION.BOTTOM_CENTER,
                            }
                        );
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

    return isUploading ?
    <PopUp
        isOpen
        appElement=".app"
        showTopbarOnMobile={false}
        onClose={() => {}}
    >
        <div className="p-4 rounded d-flex align-items-center justify-content-center bg-white">
            <div>
                <div className="d-flex justify-content-center p-2">
                    <i className="gg-spinner" />
                </div>
                <h6>Uploading Media</h6>
            </div>
        </div>
    </PopUp> :
    allowEditing && isAttaching ?
    <Attacher
        aspect={aspect}
        lockAspectRatio={lockAspectRatio}
        onClose={onCancel}
        onComplete={handleOnAttach}
    />
    : media ?
    <Preview
        onDelete={handleDelete}
        url={media.url}
        type={media.type}
        altText="Attachment"
        showDeleteButton={allowEditing}
    /> : null;

};
