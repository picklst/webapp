import React from 'react';
import TextInput from "../../../forms/TextInput";
import Button from "../../../ui/Button";
import BottomPopup from "../../../ui/BottomPopup";

const ListRequester = ({ message, username, onChange, onSubmit, onClose }) => {

    return <BottomPopup
        className="bg-white"
        onClose={onClose}
        title="Send a Request"
        discardLabel="Cancel Request"
    >
        <div className="p-4">
            <TextInput
                label="Your Message"
                placeholder={`Enter your message for @${username} describing the list you wish to request.`}
                name="requestMessage"
                type="textarea"
                onChange={message}
                value={onChange}
                minimal
                charLimit={200}
                showLimit
            />
            <Button
                className="btn btn-primary mt-4 btn-block"
                text="Request"
                onClick={onSubmit}
            />
        </div>
    </BottomPopup>;

};

export default ListRequester;