import React from 'react';
import PropTypes from 'prop-types';
import dynamic from "next/dynamic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt, faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons"

const Button = dynamic(import("../../../components/ui/Button"));

const ListRankPlate = ({ index, totalItems, isMovable, isRanked, onMoveUp, onMoveDown }) =>
isRanked || totalItems > 1 ?
    <div className="d-inline-block">
        {   isMovable && index > 0 ?
            <Button
                onClick={() => onMoveUp(index)}
                className="plain-button p-1 text-dark small no-shadow mr-2"
                text={<FontAwesomeIcon icon={faChevronUp} />}
            /> : null
        }
        {   isMovable && index+1 < totalItems  ?
            <Button
                onClick={() => onMoveDown(index)}
                className="plain-button p-1 text-dark small no-shadow"
                text={<FontAwesomeIcon icon={faChevronDown} />}
            /> : null
        }
    </div>
: null;

ListRankPlate.propTypes = {
    index: PropTypes.number,
    totalItems: PropTypes.number,
    isMovable: PropTypes.bool,
    isRanked: PropTypes.bool,
    onMoveUp: PropTypes.func,
    onMoveDown: PropTypes.func
};

const ListItemEditorHeader = ({
    index, totalItems, itemID,
    isOpen = true, isRanked = false, allowDeletion = true, allowEditing = true,
    onOpen, onMoveUp, onMoveDown, onDelete
}) => (
    <div className="row mx-0 mb-2">
        <div className="col-4 d-flex align-items-center p-0">
            <ListRankPlate
                isRanked={isRanked}
                isMovable
                index={index}
                totalItems={totalItems}
                onMoveDown={onMoveDown}
                onMoveUp={onMoveUp}
            />
        </div>
        <div className="col-4 p-0 text-center">
             <span className="small pl-1 pr-2">{ isRanked ? `${index+1} / ${totalItems}` : `# ${index+1}` } </span>
        </div>
        <div className="col-4 d-flex justify-content-end align-items-center p-0">
            { !isOpen && allowEditing ?
                <Button
                    onClick={() => onOpen(itemID)}
                    text={<FontAwesomeIcon icon={faPencilAlt} />}
                    className="plain-button p-1 text-primary small no-shadow mr-2"
                /> : null
            }
            {  allowDeletion ?
                <Button
                    text={<FontAwesomeIcon icon={faTrash} />}
                    className="plain-button p-1 text-danger small no-shadow"
                    onClick={() => onDelete(index)}
                /> : null
            }
        </div>
    </div>
);

ListItemEditorHeader.propTypes = {
    index: PropTypes.number.isRequired,
    totalItems: PropTypes.number,
    isOpen: PropTypes.bool,
    isRanked: PropTypes.bool,
    allowDeletion: PropTypes.bool,
    onOpen: PropTypes.func,
    onMoveUp: PropTypes.func,
    onMoveDown: PropTypes.func,
    onDelete: PropTypes.func
};

export default ListItemEditorHeader;