import React, {useEffect, useState} from 'react';

import { Card } from '../views';
import { EditorModule } from "../modules";
import EditorHeader from "../views/editor/header";

export default ({
    slug, id, index, totalItems,
    name, comment, url, media, poll, votes,
    className, labels,  contributor, userCanEdit, showRank, viewType = 'card',
    allowSave = true, isVotable = false, showSaveButton = false, showEditButton = false, showMoveButtons = true, showDeleteButton = true, hideOptionMenu,
    requireUpdate, isEditing: isEditingProp,
    onClick, onEdit, onClose, onSave, onChange, onMoveUp, onMoveDown, onDelete
}) => {

    const [isEditing, setEditing] = useState(isEditingProp);

    useEffect(() => {
        setEditing(isEditingProp);
    }, [isEditingProp]);

    const handleEdit = () => {
        if(typeof onEdit === "function")
            onEdit(id);
        setEditing(true);
    };

    const handleClose = () => {
        // if(isEditing ===  false && typeof onClose === "function")
        if(typeof onClose === "function")
            onClose(index);
        setEditing(false);
    };

    const handleSave = (object) => {
        setEditing(false);
        if(typeof requireUpdate === "function")
            requireUpdate();
        if(typeof onSave === "function")
            onSave(object);
    };

    return userCanEdit && isEditing ?
    <EditorModule
        slug={slug}
        id={id}
        index={index}
        totalItems={totalItems}

        name={name}
        url={url}
        comment={comment}
        media={media}
        poll={poll}

        className={className}
        labels={labels}

        showSaveButton={showSaveButton}
        showMoveButtons={showMoveButtons}
        showDeleteButton={showDeleteButton}
        showEditButton={showEditButton}
        allowSave={allowSave}

        onSave={handleSave}
        onEdit={handleEdit}
        onClose={handleClose}
        onChange={onChange}

        onMoveUp={onMoveUp}
        onMoveDown={onMoveDown}
        onDelete={onDelete}
        requireUpdate={requireUpdate}
    /> :
    <Card
        id={id}
        slug={slug}
        index={index}
        totalItems={totalItems}
        className={className}

        name={name}
        comment={comment}
        url={url}
        media={media}
        poll={poll}

        votes={votes}
        contributor={contributor}

        userCanEdit={userCanEdit}
        viewType={viewType}
        showRank={showRank}
        isVotable={isVotable}
        hideOptionMenu={hideOptionMenu}
        onClick={onClick}
        onEdit={handleEdit}
        onDelete={onDelete}
        hideFooter={!allowSave || showEditButton}
        header={
            !allowSave || showEditButton ?
            <React.Fragment>
                <EditorHeader
                    id={id}
                    slug={slug}
                    index={index}
                    totalItems={totalItems}
                    showDeleteButton={showDeleteButton}
                    showMoveButtons={showMoveButtons}
                    showEditButton={showEditButton}
                    onMoveUp={onMoveUp}
                    onMoveDown={onMoveDown}
                    allowSave={allowSave}
                    onDelete={onDelete}
                    onEdit={handleEdit}
                    requireUpdate={requireUpdate}
                />
                <h4>{name}</h4>
            </React.Fragment>: null
        }
    />;
};