import React, {useState} from 'react';
import classNames from 'classnames';
import Cropper from 'react-easy-crop'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faUndo, faCheck } from "@fortawesome/free-solid-svg-icons";

import PopUp from "../../../components/ui/PopUp";
import Button from "../../../components/ui/Button";
import getCroppedImg from "./cropImage";


const AdjustmentButton = ({ text, isSelected, onClick }) => {
    return <button
        onClick={onClick}
        className={classNames('plain-button adjustment-button mx-3 font-weight-bold', isSelected ? 'text-warning' : 'text-light')}
    >
        {text}
    </button>
};

const ImageEditor = ({ image, onClose, onComplete }) => {

    const [crop, onCropChange] = useState({ x: 0, y: 0 });
    const [zoom, onZoomChange] = useState(1);
    const [aspect, setAspect] = useState(4/3);
    const [rotation, onRotationChange] = useState(0);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const onCropComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };

    const handleSubmission = async (e) => {
        const croppedImage = await getCroppedImg(image, croppedAreaPixels, rotation);
        onComplete(croppedImage);
    };

    return  <PopUp
        isOpen={true}
        className="media-editor-card"
        label="Media Uploader"
        appElement=".app"
    >
        <div
            className="bg-dark"
            style={{
                width: '100vw',
                minHeight: '600px',
                maxWidth: '720px',
            }}
        >
            <div className="row mx-0">
                <div className="col-6 p-2">
                    <Button
                        text={<FontAwesomeIcon icon={faTimes} size="lg" />}
                        className="plain-button text-white no-shadow"
                        onClick={() => onClose(false)}
                    />
                </div>
                <div className="col-6 p-2 text-right">
                    <Button
                        text={<FontAwesomeIcon icon={faCheck} size="lg" />}
                        className="plain-button text-white no-shadow"
                        onClick={handleSubmission}
                    />
                </div>
            </div>
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
                    <AdjustmentButton isSelected={aspect===16/9} text="16:9" onClick={() => setAspect(16/9)}/>
                    <AdjustmentButton isSelected={aspect===4/3} text="4:3" onClick={() => setAspect(4/3)}/>
                    <AdjustmentButton isSelected={aspect===1} text="1:1" onClick={() => setAspect(1)}/>
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