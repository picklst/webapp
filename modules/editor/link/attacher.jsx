import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { urlValidator } from "../../../data/regexValidators";

import TextInput from "../../../components/forms/TextInput";
import PopUp from "../../../components/ui/PopUp";
import Button from "../../../components/ui/Button";
import Card from "../../../components/ui/Cards";

const LinkAttacher = ({ onComplete, isOpen, onClose }) => {
    const [link, setLink] = useState(null);
    const [isValidated, setValidated] = useState(false);

    return <PopUp
        isOpen={isOpen}
        onClose={onClose}
        className="link-attacher-card"
        label="Link Attacher"
        appElement=".app"
    >
        <Card p={3} className="bg-white rounded" style={{ width: '90vw', maxWidth: '720px' }}>
            <form onSubmit={(e) => { e.preventDefault(); onComplete(link ? link : clipboard); }}>
                <TextInput
                    label="URL"
                    name="url"
                    type="url"
                    placeholder="Enter URL"
                    onChange={setLink}
                    value={link}
                    customRegex={urlValidator}
                    onValidate={setValidated}
                />
                { isValidated ?
                    <Button
                        className="px-3 small-button btn-primary mt-3"
                        text="🔗 Attach Link"
                        type="submit"
                    />
                : null }
            </form>
        </Card>
    </PopUp>;
};

LinkAttacher.propTypes = {
    isOpen: PropTypes.bool,
    onComplete: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
};

export default LinkAttacher;