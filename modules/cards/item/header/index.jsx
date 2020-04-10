import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons"

import ItemRearrangeButtons from "./RearrangeButtons";
import Button from "../../../../components/ui/Button";

const ListCardHeader = ({
   index, totalItems,
   isRanked,
   showMoveButtons, showPosition, showEditButton, showDeleteButton,
   onMoveUp, onMoveDown,  onEdit, onDelete
}) =>
<div className="row mx-0 mb-2">
{
showMoveButtons ?
    <div className="col-4 d-flex align-items-center p-0">
        <ItemRearrangeButtons
            index={index}
            totalItems={totalItems}
            onMoveDown={onMoveDown}
            onMoveUp={onMoveUp}
        />
    </div> : null
}
{
showPosition ?
    <div className="col-4 p-0 text-center">
        <span className="small pl-1 pr-2">
            { isRanked ? `${index+1} / ${totalItems}` : `# ${index+1}` }
        </span>
    </div> : null
}
{
showEditButton || showDeleteButton ?
    <div className="col d-flex justify-content-end align-items-center p-0">
    {
        showEditButton ?
        <Button
            onClick={() => onEdit(index)}
            text={<FontAwesomeIcon icon={faPencilAlt} />}
            className="plain-button p-1 text-primary small no-shadow mr-2"
        /> : null
    }
    {
        showDeleteButton ?
        <Button
            text={<FontAwesomeIcon icon={faTrash} />}
            className="plain-button p-1 text-danger small no-shadow"
            onClick={() => onDelete(index)}
        /> : null
    }
    </div> : null
}
</div>;

export default ListCardHeader;