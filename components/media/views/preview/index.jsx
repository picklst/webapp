import React from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import Card from "../../../ui/Cards";

export default ({ type, url, altText, onDelete }) => {

    return <Card>
        <button
            onClick={() => onDelete()}
            className="position-absolute top-0 right-0 text-white bg-danger p-2 m-1 rounded plain-button"
        >
            <FontAwesomeIcon icon={faTrash} />
        </button>
        {
            type === 'image' ?
                <img
                    src={url}
                    alt={altText ? altText : 'image-preview'}
                    style={{ width: '100%' }}
                /> : null
        }
    </Card>
};