import React, {useState} from 'react';

import Button from "../../../components/ui/Button";
import ImageEditor from "./imageEditor";

import '../../../styles/list/media-uploader.sass';

function readFile(file) {
    return new Promise(resolve => {
        const reader = new FileReader();
        reader.addEventListener('load', () => resolve(reader.result), false);
        reader.readAsDataURL(file)
    })
}

const MediaUploader = ({ onComplete }) => {
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
                    type: 'video',
                    file: selectedFile
                });
            }
        }
    };

    return !isSelected ?
    <div className="list-media-uploader">
        <Button
            className="plain-button bg-light rounded-pill no-shadow text-dark px-3 py-1"
            text={<div className="small">📸 Media</div>}
        />
        <input
            type="file"
            onChange={handleSelection}
            accept="image/*,video/*"
            data-max-size="1024 * 1024 * 10"
        />
    </div> :
    <ImageEditor
        onComplete={(file) => {
            onComplete({
                type: 'image',
                file: file
            })
        }}
        image={image}
        onClose={setSelected}
    />
};

export default MediaUploader;