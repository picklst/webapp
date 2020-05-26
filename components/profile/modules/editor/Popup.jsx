import React from 'react';
import {clearAllBodyScrollLocks} from "body-scroll-lock";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import { Button, PopUp } from "../../../ui";

export default ({ children, onSave, onClose }) => {

    const handleClose = () => {
        clearAllBodyScrollLocks();
        onClose();
    };

    const handleSave = () => {
        clearAllBodyScrollLocks();
        onSave();
    };

    return <PopUp
        isOpen
        onClose={onClose}
        appElement=".app"
        className="p-0 bg-white"
        showTopbar
        button={
            <Button
                brandAccent
                className="font-weight-bold no-shadow"
                onClick={handleSave}
                text="Save"
            />
        }
    >
        <div style={{
            overflowY: 'auto',
            height: '85vh'
        }}>
            {children}
        </div>
    </PopUp>;
};