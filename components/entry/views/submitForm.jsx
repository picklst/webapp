import React from "react";
import shortid from "shortid";
import styled from '@emotion/styled'
import {clearAllBodyScrollLocks} from "body-scroll-lock";

import {ItemCard} from "../../item";
import {BottomPopup, Button} from "../../ui";

const SubmitEntryPopup = styled(BottomPopup)`
  background-color: white;
`;

export default ({ isSubmitting, hasSubmitted, onSubmit, onClose }) => {

    const handleClose = () => {
        clearAllBodyScrollLocks();
        onClose();
    };

    const submittingMessage =
    <div className="animated fadeIn d-flex align-items-center justify-content-center p-4">
        <div className="text-center">
            <div className="d-flex mb-2 justify-content-center">
                <i className="gg-spinner" />
            </div>
            <h4>Submitting</h4>
            <p>Please wait while we are submitting this entry.</p>
        </div>
    </div>;

    const submittedMessage =
    <div className="row m-0 animated fadeIn p-3">
        <div className="col-md-4 d-flex justify-content-center align-items-center p-2">
            <img
                alt="submitted"
                className="w-100"
                style={{ maxWidth: '200px' }}
                src={require('../../../images/assets/illustrations/thumbs-up.png')}
            />
        </div>
        <div className="col d-flex align-items-center p-1">
            <div>
                <h4 className="text-success d-flex align-items-center">
                    <i className="gg-check-o" /> <span className="pl-2">Entry Submitted</span>
                </h4>
                <p>
                    Your entry has been submitted. It will shown in this list, once the curator or one of the collaborators of
                    the list reviews and approves it.
                </p>
                <Button className="mx-0 my-3" text="Close" onClick={handleClose} />
            </div>
        </div>
    </div>;

    return <SubmitEntryPopup
        isOpen
        appElement=".app"
        onClose={onClose}
        title="Add Your Entry"
    >
        {   hasSubmitted? submittedMessage :
            isSubmitting ? submittingMessage :
                <ItemCard
                    key={shortid.generate()}
                    id={shortid.generate()}

                    className="my-2 w-100"
                    index={0}
                    totalItems={0}

                    isEditing
                    isCreating
                    userCanEdit
                    onSave={onSubmit}
                    onClose={handleClose}
                    showSaveButton
                    showDeleteButton={false}
                    showMoveButtons={false}
                    allowSave={false}
                    labels={{ 'save': "Submit Entry" }}
                />
        }
    </SubmitEntryPopup>
}