import React, {useState} from 'react';

import { Card } from '../views';
import { EditorModule } from "../modules";

export default ({
    slug, itemKey, index, totalItems,
    name, comment, url, media, userCanEdit,
    className, showSaveButton,
    requireUpdate
}) => {

    const [isEditing, setEditing] = useState(false);

    const handleSave = () => {
        setEditing(false);
        if(typeof requireUpdate === "function")
            requireUpdate();
    };

    return isEditing ?
    <EditorModule
        slug={slug}
        itemKey={itemKey}
        index={index}
        totalItems={totalItems}

        name={name}
        url={url}
        comment={comment}
        media={media}
        className={className}

        showSaveButton={showSaveButton}
        onSave={handleSave}
    /> :
    <Card
        slug={slug}
        itemKey={itemKey}
        index={index}
        totalItems={totalItems}

        name={name}
        comment={comment}
        url={url}
        media={media}
        className={className}
        userCanEdit={userCanEdit}
        isEditing={isEditing}
        onEdit={() => setEditing(true)}
        showSaveButton={showSaveButton}
    />;
};