import Card from "../../../ui/Cards";
import React from "react";

import { EditorModule } from '../../modules'
import Header from "./header";
import Body from "./body";

export default ({
    slug, itemKey, name, comment, url, media, entityID,
    index, totalItems, className,
    isEditing, showSaveButton, showEditButton, showDeleteButton, showMoveButton,
    requireUpdate, onEdit,
}) =>
<Card
    className={className}
    p={3}
>
    <Header
        slug={slug}
        itemKey={itemKey}
        totalItems={totalItems}
        index={index}
        showDeleteButton={showDeleteButton}
        showMoveButtons={showMoveButton}
        showEditButton={showEditButton}
        onClickEdit={onEdit}
        requireUpdate={requireUpdate}
    />
    { isEditing ?
    <EditorModule
        slug={slug}
        itemKey={itemKey}
        name={name}
        comment={comment}
        url={url}
        media={media}
        onSave={requireUpdate}
        showSaveButton={showSaveButton}
    /> :
    <Body
        name={name}
        comment={comment}
        media={media}
        url={url}
    /> }
</Card>;

