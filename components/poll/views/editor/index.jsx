import React from "react";
import styled from '@emotion/styled'
import {Button} from "../../../ui";

import OptionEditor from "./option";
import QuizOptions from "./quiz";

const PollContainer = styled.div`
  padding: 0.75rem 0.5rem;
  background-color: #311B92;
  border-radius: 0.5rem;
  margin: 0.75rem 0;
`;

export default ({
    options, answer, currentOption,
    isEditing, isCreating,
    onAddOption, onChangeOption, onEditOption, onDeleteOption,
    onChangeAnswer,
    onEdit, onSave, onDelete,  onCancel
}) => {

    const renderActionsButtons = () =>
    <div className="d-flex mt-4 align-items-center">
        {
            options.length > 1 &&
            <Button
                brandAccent
                title="Save"
                text={
                    <div className="text-light d-flex align-items-center">
                        <i className="gg-poll"/>
                        <span className="pl-2">
                            { answer === null ? `Save Poll` : `Save Question` }
                        </span>
                    </div>
                }
                onClick={onSave}
            />
        }
        <Button
            title="Cancel"
            className="px-3"
            text="Cancel"
            onClick={onCancel}
        />
    </div>;

    return <PollContainer>
        <div className="py-2 px-md-2">
            <div className="row mx-0 mb-3">
                <div className="col-6 d-flex align-items-center text-light px-2">
                    <h5 className="mb-0">{answer === null ? `Poll` : `Quiz`} Editor</h5>
                </div>
                <div className="col-6 px-0 d-flex justify-content-end align-items-center">
                    {
                        !isEditing &&
                        <Button
                            title="Edit Poll"
                            text="Edit"
                            className="small px-2"
                            onClick={onEdit}
                        />
                    }
                    {
                        !isCreating &&
                        <Button
                            title="Remove Poll"
                            text={<i className="gg-trash" />}
                            className="small text-danger ml-2 px-3 py-2"
                            onClick={onDelete}
                        />
                    }
                </div>
            </div>
            <div className="text-light mb-2"><b>Options</b></div>
            {   options.map((i,index) =>
                <OptionEditor
                    key={i.id}
                    {...i}
                    allowEditing={isEditing}
                    isEditing={isEditing && i.id === currentOption || options.length === 1}
                    onChange={(data) => onChangeOption(data, index)}
                    onEdit={onEditOption}
                    onDelete={() => onDeleteOption(index)}
                />
            )}
        </div>
        {   (isEditing && options.length < 8) &&
            <div className="mb-3">
                <Button
                    brandAccent
                    title="Add Option"
                    className="small"
                    text={
                        <div className="d-flex align-items-center">
                            <i className="gg-math-plus" />
                            <span className="pl-1">Add Option</span>
                        </div>
                    }
                    onClick={onAddOption}
                />
            </div>
        }
        <div className="px-1">
            <QuizOptions
                isEditing={isEditing}
                options={options}
                value={answer}
                onChange={onChangeAnswer}
            />
        </div>
        {  isEditing && renderActionsButtons() }
    </PollContainer>;

}