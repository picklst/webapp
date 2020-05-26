import React from "react";
import { toast } from 'react-toastify';

import {APIPost, APIRequest} from "../../../../utils";

import {Card} from "../../views";
import {createFileFromURI} from "../../../commons";


export default ({
    name, description, properties, coverURL, topic, slug, curator,
    timestampCreated, timestampLastEdited, itemCount,
    compact, isEditing, userCanEdit, isTitleCard, hideUsername, hideTopbar,
    onEdit, onDelete, onExitEdit
}) => {

    const uploadCover = async (blobURL) => {
        const d = new FormData();
        const mediaFile = await createFileFromURI({ dataURI:  blobURL, fileName: 'cover.jpg' });
        d.append('cover', mediaFile);
        const query = `mutation { listCoverUpload(list: { slug : "${slug}"}) }`;
        d.append('query', query);
        return await APIPost({data: d, requireAuth: true}).then((data) => {
            return { success: true, data };
        }).catch((errors) => { return { success: false, errors }; });
    };

    const deleteCover = async () => {
        const query = `mutation { listCoverDelete(list: { slug : "${slug}"}) }`;
        return await APIRequest({ query }).then((data) => {
            return { success: true, data };
        }).catch((errors) => {
            return { success: false, errors }
        });
    };

    const updateList = async (variables) => {
        const query = `
        mutation update_list($slug: String!, $input: ListInput!){
          listUpdate(list: { slug: $slug }, input: $input)
          {
            returning {
              id
            }
          }
        }`;
        return await APIRequest({ query, variables }).then((data) => {
            return { success: true };
        }).catch((errors) => {
            return { success: false, errors }
        });
    };

    const handleMedia = async (data) => {
        if (data.cover && data.cover.url && data.cover.url.startsWith("blob")) {
            return await uploadCover(data.cover.url).then(({success, data, errors}) => {
                if (success) {
                    toast.success(
                        "Cover Uploaded",
                        {
                            autoClose: 1000, hideProgressBar: true, closeButton: false,
                            position: toast.POSITION.BOTTOM_CENTER,
                        }
                    );
                    return true;
                } else {
                    toast.error(
                        "Could not upload cover due to an unknown error. Please try again.",
                        {
                            autoClose: 1000, hideProgressBar: true, closeButton: false,
                            position: toast.POSITION.BOTTOM_CENTER,
                        }
                    );
                    return true;
                }
            })
        } else if(data.cover && data.cover.delete) {
            return await deleteCover().then(({success, data, errors}) => {
                if (success) {
                    toast.success(
                        "Cover Deleted",
                        {
                            autoClose: 1000, hideProgressBar: true, closeButton: false,
                            position: toast.POSITION.BOTTOM_CENTER,
                        }
                    );
                    return true;
                } else {
                    toast.error(
                        "Could not delete cover due to an unknown error. Please try again.",
                        {
                            autoClose: 1000, hideProgressBar: true, closeButton: false,
                            position: toast.POSITION.BOTTOM_CENTER,
                        }
                    );
                    return true;
                }
            });
    }
        return false
    };

    const handleSave = async (data) => {
        if(!await handleMedia(data)){
            const variables = {
                slug,
                input: {
                    name: data.name,
                    properties: data.properties,
                    description: data.description,
                }
            };
            if(data.topic)
                variables['input']['topic'] = data.topic.slug;
            updateList(variables).then(({ success, errors, data }) => {
                if(success)
                {
                    toast.success(
                        "Saved successfully",
                        {
                            autoClose: 1000, hideProgressBar: true, closeButton: false,
                            position: toast.POSITION.BOTTOM_CENTER,
                        }
                    );
                } else {
                    toast.error(
                        "Could not save due to an unknown error. Please try again.",
                        {
                            autoClose: 1000, hideProgressBar: true, closeButton: false,
                            position: toast.POSITION.BOTTOM_CENTER,
                        }
                    );
                }
            });
        }
    };

    return <Card
        name={name}
        description={description}
        properties={properties}
        coverURL={coverURL}
        topic={topic}
        slug={slug}
        curator={curator}
        compact={compact}
        userCanEdit={userCanEdit}
        hideUsername={hideUsername}
        hideTopbar={hideTopbar}
        itemCount={itemCount}
        timestampCreated={timestampCreated}
        timestampLastEdited={timestampLastEdited}
        isTitleCard={isTitleCard}
        isEditing={isEditing}
        onEdit={onEdit}
        onDelete={onDelete}
        onExitEdit={onExitEdit}
        onSave={handleSave}
    />
};