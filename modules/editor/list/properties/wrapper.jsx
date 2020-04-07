import React from 'react';
import Button from "../../../../components/ui/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

const ListPropertyEditorWrapper = ({
   editor, previewer, propertyName,
   isEditing, showSkip,
   onSave, onSkip, onRequestEdit
}) =>
<div className="px-3 pt-2">
    { isEditing ?
        <form onSubmit={(e) => { e.preventDefault(); onSave(true); }}>
            {editor}
            <div className="py-2 my-2">{ showSkip ?
                <Button
                    text="Skip"
                    onClick={() => onSkip()}
                    className="rounded-pill mr-2 px-4 py-2 grey-button"
                /> :
                <Button
                    className="rounded-pill px-4 py-2 blue-button"
                    text="Save"
                    type="submit"
                />}
            </div>
        </form> :
        <React.Fragment>
            <div className="text-primary font-weight-bold position-relative">
                {propertyName}
                <Button
                    className="small no-shadow py-1 px-0 position-absolute right-0 plain-button"
                    onClick={onRequestEdit}
                    text={
                        <span className="text-primary small">
                    <FontAwesomeIcon icon={faPen} /> Edit
                </span>
                    }
                />
            </div>
            {previewer}
        </React.Fragment>
    }
</div>;

export default ListPropertyEditorWrapper;
