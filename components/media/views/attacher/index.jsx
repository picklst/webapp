import React, {useEffect, useState} from 'react';
import shortid from 'shortid';
import styled from '@emotion/styled'

import ImageEditor from "../../../../components/editors/ImageEditor/imageEditor";
import { Button } from "../../../ui";

const UploaderButtonWrapper = styled.div`
  position: relative;
  margin: 0.75rem 0.25rem;
  display: inline-block;
  input
  {
    opacity: 0;
    left: 0;
    top: 0;
    width: 100%;
    position: absolute;
    height: 100%;
    cursor: pointer;
  }
`;

const AttachmentTypeButton = styled(Button)`
    padding: 0.5rem;
`;

function readFile(file) {
    return new Promise(resolve => {
        const reader = new FileReader();
        reader.addEventListener('load', () => resolve(reader.result), false);
        reader.readAsDataURL(file)
    })
}

export default ({ onClose, onComplete, lockAspectRatio, aspect }) => {
    const [isSelected, setSelected] = useState(false);
    const [image, setImage] = useState(null);

    const fileInput = React.createRef();
    useEffect(() => {
        if(fileInput)
            fileInput.current.click();
    }, []);


    const handleSelection = async (e) => {
        const selectedFile = e.target.files[0];
        const ImagePattern = /image-*/;
        const VideoPattern = /video-*/;

        const maxSize = 1024 * 1024 * 10;
        if (maxSize > selectedFile.size) {
            if(selectedFile.type.match(ImagePattern))
            {
                let dataURL = await readFile(selectedFile);
                setImage(dataURL);
                setSelected(true);
            }
            else if(selectedFile.type.match(VideoPattern))
            {
                onComplete({
                    key: shortid.generate(),
                    type: 'video',
                    file: selectedFile
                });
            }
        }
    };

    return !isSelected ?
        <UploaderButtonWrapper>
            <AttachmentTypeButton
                text={
                    <React.Fragment>
                        <i className="gg-image mr-2" />
                        <span>Attach Media</span>
                    </React.Fragment>
                }
            />
            <input
                ref={fileInput}
                type="file"
                className="p-2"
                title="Select Photo or Video to Attach"
                onChange={handleSelection}
                accept="image/*,video/*"
                data-max-size="1024 * 1024 * 10"
            />
        </UploaderButtonWrapper>:
        <ImageEditor
            onComplete={onComplete}
            image={image}
            onClose={onClose}
            aspect={aspect}
            lockAspectRatio={lockAspectRatio}
        />

};