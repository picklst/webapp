import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { urlValidator } from "../../data/regexValidators";

import {BottomPopup, Button, TextInput,} from "../../components/ui/";


const LinkAttacher = ({ onComplete, isOpen, onClose }) => {
    const [link, setLink] = useState('');
    const [isValidated, setValidated] = useState(false);

    const renderSupportedEmbeds =
    <div className="mt-2 line-height-1 small">
        You can paste here links from Youtube, Instagram, Twitter (+more coming soon) to embed them directly.
    </div>;

    return <BottomPopup
        title="Attach Link"
        isOpen={isOpen}
        onClose={onClose}
        className="bg-white"
        appElement=".app"
    >
        <div className="p-3">
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
                        brandAccent
                        className="px-3 small-button mt-3"
                        text={
                            <div className="d-flex align-items-center">
                                <i className="gg-link" /> <span className="pl-2">Attach Link</span>
                            </div>
                        }
                        type="submit"
                    />
                    : renderSupportedEmbeds
                }
            </form>
        </div>
    </BottomPopup>;
};

LinkAttacher.propTypes = {
    isOpen: PropTypes.bool,
    onComplete: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
};

export default LinkAttacher;