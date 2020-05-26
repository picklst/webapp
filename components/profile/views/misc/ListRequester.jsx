import React from 'react';
import {useGlobalState} from "../../../../actions/states/Auth.ts";

import {AuthCard} from "../../../auth";

import TextInput from "../../../forms/TextInput";
import { Button, BottomPopup } from "../../../ui";

const ListRequester = ({
   message, username,
   isSending, hasSent,
   onChange, onSubmit, onClose
}) => {
    const [data] = useGlobalState('UserInfo');
    const isLoggedIn = !!data;

    const submittingMessage =
    <div className="animated fadeIn d-flex align-items-center justify-content-center p-4">
        <div className="text-center">
            <div className="d-flex mb-2 justify-content-center">
                <i className="gg-spinner" />
            </div>
            <h4>Submitting</h4>
            <p>Please wait while we are sending your request.</p>
        </div>
    </div>;

    const submittedMessage =
    <div className="row m-0 animated fadeIn p-3">
        <div className="col-md-4 d-flex justify-content-center align-items-center p-2">
            <img
                alt="submitted"
                className="w-100"
                style={{ maxWidth: '200px' }}
                src={require('../../../../images/assets/illustrations/thumbs-up.png')}
            />
        </div>
        <div className="col d-flex align-items-center p-1">
            <div>
                <h4 className="text-success d-flex align-items-center">
                    <i className="gg-check-o" /> <span className="pl-2">Request Sent</span>
                </h4>
                <p>Your request for the list has been sent to @{username}.</p>
                <Button className="mx-0 my-3" text="Close" onClick={onClose} />
            </div>
        </div>
    </div>;

    const renderForm =
    <div className="p-4">
        <TextInput
            label="Your Message"
            placeholder={`Enter your message for @${username} describing the list you wish to request.`}
            name="requestMessage"
            type="textarea"
            onChange={onChange}
            value={message}
            minimal
            charLimit={200}
            showLimit
        />
        <Button
            brandAccent
            className="w-100 mt-3"
            text="Request"
            onClick={onSubmit}
        />
    </div>;

    return isLoggedIn ? <BottomPopup
        className="bg-white text-dark text-left"
        onClose={onClose}
        title="Send a Request"
        discardLabel="Cancel Request"
    >
        { isSending ? submittingMessage : hasSent ? submittedMessage : renderForm }
    </BottomPopup> : <AuthCard variant="bottom-popup" onClose={onClose} /> ;

};

export default ListRequester;