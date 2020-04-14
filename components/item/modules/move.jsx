import React from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons"

import { moveItemAPI } from '../api';
import Button from "../../ui/Button";

export default ({ slug, itemKey, index, totalItems, requireUpdate }) => {

    const handleMoveItem = ({ direction }) => {
        moveItemAPI({
            key: itemKey, direction, slug
        }).then(r => {
            requireUpdate(true);
        });
    };

    return <div className="d-inline-block">
        {   index > 0 ?
            <Button
                onClick={() => handleMoveItem({ direction: "up" }) }
                className="plain-button p-1 text-dark small no-shadow mr-2"
                text={<FontAwesomeIcon icon={faArrowUp} />}
            /> : null
        }
        { index+1 < totalItems  ?
            <Button
                onClick={() => handleMoveItem({ direction: "down"})}
                className="plain-button p-1 text-dark small no-shadow"
                text={<FontAwesomeIcon icon={faArrowDown} />}
            /> : null
        }
    </div>

};