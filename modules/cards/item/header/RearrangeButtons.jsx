import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons"
import Button from "../../../../components/ui/Button";


const ItemRearrangeButtons = ({
  index, totalItems, onMoveUp, onMoveDown
}) =>
<div className="d-inline-block">
    {   index > 0 ?
        <Button
            onClick={() => { if(typeof onMoveUp === "function") onMoveUp(index) }}
            className="plain-button p-1 text-dark small no-shadow mr-2"
            text={<FontAwesomeIcon icon={faArrowUp} />}
        /> : null
    }
    { index+1 < totalItems  ?
        <Button
            onClick={() => { if(typeof onMoveDown === "function") onMoveDown(index) }}
            className="plain-button p-1 text-dark small no-shadow"
            text={<FontAwesomeIcon icon={faArrowDown} />}
        /> : null
    }
</div>;

export default ItemRearrangeButtons;