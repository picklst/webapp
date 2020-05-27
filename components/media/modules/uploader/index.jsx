import React, {useState} from 'react';
import shortid from 'shortid';
import styled from '@emotion/styled'

import Button from "../../../../components/ui/Button";
import ImageEditor from "../../../../components/editors/ImageEditor/imageEditor";

const UploaderButtonWrapper = styled.div`
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
    cursor: pointer;
  }
`;

const AttachmentTypeButton = styled(Button)`
    width: 40px;
    height: 40px;
`;

function readFile(file) {
    return new Promise(resolve => {
        const reader = new FileReader();
        reader.addEventListener('load', () => resolve(reader.result), false);
        reader.readAsDataURL(file)
    })
}

export default ({ onComplete, aspect, lockAspectRatio }) => {
    const [isSelected, setSelected] = useState(false);
    const [image, setImage] = useState(null);

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
            <AttachmentTypeButton text={<div><i className="gg-image" /></div>} />
            <input
                type="file"
                onChange={handleSelection}
                accept="image/*"
                data-max-size="1024 * 1024 * 10"
            />
        </UploaderButtonWrapper> :
        <ImageEditor
            onComplete={onComplete}
            image={image}
            onClose={setSelected}
            aspect={aspect}
            lockAspectRatio={lockAspectRatio}
        />
};