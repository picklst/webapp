import React from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import PopUp from "../../../ui/PopUp";

export default ({ children, onSave, onClose }) => {

    return <PopUp
        isOpen
        onClose={onClose}
        appElement=".app"
        className="p-0 m-2 bg-white"
    >
        <div style={{
            overflowY: 'auto',
            height: '85vh'
        }}>
            <div className="p-2 bg-primary sticky-top">
                <div className="row m-0">
                    <div className="col-6 px-1">
                        <button
                            className="plain-button text-light py-2 no-shadow"
                            onClick={onClose}
                        >
                            {<FontAwesomeIcon icon={faTimes} size="lg" />}
                        </button>
                    </div>
                    <div className="col-6 px-1 d-flex align-items-center justify-content-end">
                        <button
                            className="btn btn-light font-weight-bold px-5 py-2 no-shadow"
                            onClick={onSave}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
            {children}
        </div>
    </PopUp>;
};