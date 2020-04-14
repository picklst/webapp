import React from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons"

import { deleteItemAPI } from '../api';
import Button from "../../ui/Button";

export default ({ slug, itemKey, requireUpdate }) => {

    const handleDeleteItem = () => {
        deleteItemAPI({
            key: itemKey,
            slug
        }).then(r => {
            requireUpdate(true);
        });
    };

    return <Button
        text={<FontAwesomeIcon icon={faTrash} />}
        className="plain-button p-1 text-danger small no-shadow"
        onClick={handleDeleteItem}
    />;

};