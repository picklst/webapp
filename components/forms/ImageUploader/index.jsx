import React, {useState} from 'react';
import ImageEditor from "../../editors/ImageEditor/imageEditor";

import styled from '@emotion/styled'

function readFile(file) {
    return new Promise(resolve => {
        const reader = new FileReader();
        reader.addEventListener('load', () => resolve(reader.result), false);
        reader.readAsDataURL(file)
    })
};

const UploaderButton = styled.div`
    position: relative;
    display: inline-block;
    input
    {
        opacity: 0;
        left: 0;
        top: 0;
        width: 100%;
        position: absolute;
        height: 100%;
    }
`;

const ImageUploader = ({
   className, buttonComponent, aspect, lockAspectRatio,
   onComplete
}) => {
    const [isSelected, setSelected] = useState(false);
    const [image, setImage] = useState(null);

    const handleSelection = async (e) => {
        const selectedFile = e.target.files[0];
        const ImagePattern = /image-*/;

        const maxSize = 1024 * 1024 * 10;
        if (maxSize > selectedFile.size) {
            if(selectedFile.type.match(ImagePattern))
            {
                let dataURL = await readFile(selectedFile);
                setImage(dataURL);
                setSelected(true);
            }
        }
    };

    return !isSelected ?
        <UploaderButton className={className} tabIndex={0}>
            {buttonComponent}
            <input
                type="file"
                onChange={handleSelection}
                accept="image/*,video/*"
            />
        </UploaderButton> :
        <ImageEditor
            aspect={aspect}
            lockAspectRatio={lockAspectRatio}
            onComplete={(file) => {
                setSelected(false);
                console.log(file);
                onComplete(file);
            }}
            image={image}
            onClose={setSelected}
        />

};

export default ImageUploader;