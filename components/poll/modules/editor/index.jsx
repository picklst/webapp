import React, {useEffect, useState} from "react";
import shortid from "shortid";
import styled from '@emotion/styled'
import {clearAllBodyScrollLocks} from "body-scroll-lock";

import {BottomPopup} from "../../../ui";

import { Editor } from '../../views';


const StyledBottomPopup = styled(BottomPopup)`
      max-height: 80vh;
      overflow-y: auto;
`;

const generateOption = () => {
    return { "id": shortid.generate(), "name": '', "media": null };
};

export default ({
    data, isCreating, onComplete, onClose, onDelete
}) => {
    const [isEditing, setEditing] = useState(isCreating);

    useEffect(() => setEditing(isCreating), [isCreating]);

    const [options, setOptions] = useState(data && data.options && data.options.length ? data.options : [generateOption()]);
    const [answer, setAnswer] = useState(data && data.answer);

    const [currentOption, setCurrentOption] = useState( 0);

    const handleChange = (data, index) => {
        options[index] = data;
        setOptions([...options]);
    };

    const handleAddOption = () => {
        const newOption = generateOption();
        setOptions([...options, newOption]);
        setCurrentOption(newOption.id);
    };

    const handleDelete = (index) => {
        setOptions((o) => [
            ...o.slice(0,index),
            ...o.slice(index+1)
        ]);
    };

    const handleOnEdit = (option) => {
        setCurrentOption(option);
        if(!isEditing)
            setEditing(true);
    };

    const handleSave = () => {
        setEditing(false);
        if(isCreating)
            clearAllBodyScrollLocks();
        onComplete({
            options,
            answer,
        });
    };

    const handleCancel = () => {
        if(isCreating)
        {
            clearAllBodyScrollLocks();
            onClose();
        } else {
            setOptions(data.options);
            setEditing(false)
        }
    };

    const renderEditor = () =>
    <Editor
        answer={answer}
        currentOption={currentOption}
        options={options}
        isCreating={isCreating}
        isEditing={isEditing}

        onAddOption={handleAddOption}
        onChangeOption={handleChange}
        onDeleteOption={handleDelete}
        onEditOption={handleOnEdit}

        onChangeAnswer={setAnswer}

        onEdit={() => { setCurrentOption(options[0].id); setEditing(true); }}
        onDelete={onDelete}
        onSave={handleSave}
        onClose={handleCancel}
    />;

    return isCreating && isEditing ?
    <StyledBottomPopup
        isOpen
        onClose={onClose}
        appElement=".app"
        title="Create a Poll/Quiz"
        children={<div className="py-3 px-2 px-md-3">{renderEditor()}</div>}
    /> : renderEditor();
}