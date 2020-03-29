import React, {useState} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

import TextInput from "../../../../components/forms/TextInput";
import Button from "../../../../components/ui/Button";

const ListNameEditor = ({
    name: nm = '',
    isPreview = false, isNew = false,
    onSubmit, onSkip, onRequestEdit
}) => {
    const [name, setName] = useState(!nm ? '' : nm);

    return <div className="px-3 pt-2">
    { !isPreview ?
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(name); }}>
            {   name.length < 1 ? <p className="mb-2 small">Let's start by naming your list.</p> : null }
            <TextInput
                label="Name"
                placeholder="Name your List"
                name="name"
                minimal
                autoComplete="off"
                charLimit={100}
                value={name}
                onChange={setName}
                isRequired
                autoFocus
            />
            <div className="py-2 my-2">
                {
                    isNew && name.length < 1 ?
                        <Button
                            text="Skip"
                            onClick={() => onSkip()}
                            className="rounded-pill mr-2 px-4 py-2 grey-button"
                        /> :
                        <Button
                            text={isNew ? "Proceed" : "Save"}
                            type="submit"
                            className="rounded-pill px-4 py-2 blue-button"
                        />
                }
            </div>
        </form> :
        <div>
            <div className="text-primary font-weight-bold position-relative">
                Name
                <Button
                    onClick={onRequestEdit}
                    text={
                        <span className="text-primary small">
                        <FontAwesomeIcon icon={faPen} /> Edit
                    </span>
                    }
                    className="small no-shadow py-1 px-0 position-absolute right-0 plain-button"
                />
            </div>
            <h4 className="mb-1">{nm}</h4>
        </div>
    }
    </div>

};

export default ListNameEditor;