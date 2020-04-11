import React, {useState} from 'react';
import ImageEditor from "../../editors/ImageEditor/imageEditor";

import '../../../styles/list/media-uploader.sass';

function readFile(file) {
    return new Promise(resolve => {
        const reader = new FileReader();
        reader.addEventListener('load', () => resolve(reader.result), false);
        reader.readAsDataURL(file)
    })
}

const ImageUploader = ({
   buttonComponent, aspect, lockAspectRatio,
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
        <div className="list-media-uploader">
            {buttonComponent}
            <input
                type="file"
                onChange={handleSelection}
                accept="image/*,video/*"
            />
        </div> :
        <ImageEditor
            aspect={aspect}
            lockAspectRatio={lockAspectRatio}
            onComplete={(file) => {
                onComplete({
                    type: 'image',
                    url: file
                })
            }}
            image={image}
            onClose={setSelected}
        />

};

export default ImageUploader;