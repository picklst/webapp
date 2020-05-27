import React, {useState} from 'react';
import shortid from 'shortid';
import classNames from 'classnames';
import Cropper from 'react-easy-crop'
import { useBeforeunload } from 'react-beforeunload';
import {clearAllBodyScrollLocks} from "body-scroll-lock";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndo, faCheck } from "@fortawesome/free-solid-svg-icons";

import PopUp from "../../ui/PopUp";
import Button from "../../ui/Button";
import getCroppedImg from "./cropImage";

import '../../../styles/list/media-uploader.sass';


const AdjustmentButton = ({ text, isSelected, onClick, }) => {
    return <button
        onClick={onClick}
        className={classNames('plain-button adjustment-button mx-3 font-weight-bold', isSelected ? 'text-warning' : 'text-light')}
    >
        {text}
    </button>
};

const ImageEditor = ({ image, aspect:as = 4/3, lockAspectRatio, onClose, onComplete }) => {

    const [crop, onCropChange] = useState({ x: 0, y: 0 });
    const [zoom, onZoomChange] = useState(1);
    const [aspect, setAspect] = useState(as);
    const [rotation, onRotationChange] = useState(0);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    useBeforeunload(event => event.preventDefault());

    const onCropComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };

    const handleSubmission = async (e) => {
        clearAllBodyScrollLocks();
        const croppedImage = await getCroppedImg(image, croppedAreaPixels, rotation);
        onComplete({ key: shortid.generate(), url: croppedImage, aspect, type: "image" });
    };

    const handleClose = () => {
        clearAllBodyScrollLocks();
        onClose(false);
    };

    return  <PopUp
        isOpen={true}
        className="media-editor-card bg-dark"
        label="Media Uploader"
        appElement=".app"
        showTopbar
        onClose={handleClose}
        topbarClassName="bg-dark text-light"
        closeButtonClassName="text-light"
        button={
            <Button
                text={<FontAwesomeIcon icon={faCheck} size="lg" />}
                className="plain-button text-white no-shadow"
                onClick={handleSubmission}
            />
        }
    >
        <div
            className="bg-dark position-relative"
            style={{
                width: '100vw',
                minHeight: '600px',
                maxWidth: '720px',
            }}
        >
            <div>
                <div className="crop-container">
                    <Cropper
                        image={image}
                        crop={crop}
                        zoom={zoom}
                        aspect={aspect}
                        rotation={rotation}
                        onRotationChange={onRotationChange}
                        onCropChange={onCropChange}
                        onCropComplete={onCropComplete}
                        onZoomChange={onZoomChange}
                    />
                </div>
                <div className="p-3 d-flex justify-content-center align-items-center w-100">
                    {
                        !lockAspectRatio ?
                            <React.Fragment>
                                <AdjustmentButton isSelected={aspect===16/9} text="16:9" onClick={() => setAspect(16/9)}/>
                                <AdjustmentButton isSelected={aspect===4/3} text="4:3" onClick={() => setAspect(4/3)}/>
                                <AdjustmentButton isSelected={aspect===1} text="1:1" onClick={() => setAspect(1)}/>
                            </React.Fragment>
                        : null
                    }
                    <AdjustmentButton
                        text={<FontAwesomeIcon icon={faUndo} />}
                        onClick={() => onRotationChange( rotation > 0 ? rotation-90 : 360)}
                    />
                </div>
            </div>
        </div>
    </PopUp>

};

export default ImageEditor;