import React from 'react';

import Card from "../../../components/ui/Cards";

import ListCardHeader from "./header";
import ListItemContentEditor from "../../editor/item/contentEditor";
import ItemCardViewer from "./viewer";

const emptyFunc = () => {};

const ItemCard = ({
    itemKey, name, comment, url, media, entityID,
    index, totalItems,
    className, labels,
    isRankedList, isEditing,
    allowEditing, enableSaving, showPosition, showDeleteButton, showMoveButton,
    onEdit, onMoveUp, onMoveDown, onDelete, onSave,
    onChangeTitle = emptyFunc, onChangeDescription = emptyFunc, onChangeMedia = emptyFunc, onChangeLink = emptyFunc
}) => {

    return <Card
        className={className}
        p={3}
    >
        <ListCardHeader
            index={index}
            totalItems={totalItems}
            isRanked={isRankedList}
            showPosition={totalItems > 1 && showPosition}
            showEditButton={allowEditing && !isEditing}
            showDeleteButton={totalItems > 1 && showDeleteButton}
            showMoveButtons={showMoveButton}
            onMoveUp={onMoveUp}
            onMoveDown={onMoveDown}
            onEdit={(i) => { if(allowEditing){ onEdit(i); }}}
            onDelete={onDelete}
        />
        { isEditing && allowEditing ?
            <ListItemContentEditor
                itemKey={itemKey}
                title={name}
                description={comment}
                url={url}
                media={media}
                entityID={entityID}
                enableSaving={enableSaving}
                onChangeTitle={onChangeTitle}
                onChangeDescription={onChangeDescription}
                onChangeMedia={onChangeMedia}
                onURLInput={onChangeLink}
                onSave={onSave}
                labels={labels}
            /> :
            <ItemCardViewer
                comment={comment}
                name={name}
                url={url}
            />
        }
    </Card>;
};


export default ItemCard;

