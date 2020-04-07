import React from 'react';
import Button from "../../../components/ui/Button";
import MediaUploader from "../media/uploader";
import SwipeList from "../../../components/ui/SwipeList";


const AttachmentTypeButton = ({ text, onClick }) => {
    return <Button
        className="plain-button bg-light rounded-pill no-shadow text-dark px-3 py-1"
        onClick={onClick}
        text={
            <div className="small">
                {text}
            </div>
        }
    />
};

const ListEditorContentTypeSelector = ({
    types
}) => {

    const getAttachmentTypesList = () => {
        const list = [];
        types.map(i =>
            i.isActive ?
            list.push(
                i.customButton ?
                    i.customButton :
                    <AttachmentTypeButton
                        onClick={i.onSelect}
                        text={i.text}
                    />
            ): null
        );
        return list;
    };

    return <SwipeList
        width="auto"
        items={getAttachmentTypesList()}
    />

};

export default ListEditorContentTypeSelector;

