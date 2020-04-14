import React from "react";
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons"

import { MoveButtons, DeleteButton } from "../../modules";
import Button from "../../../ui/Button";

const ItemHeader = (props) =>
<div className="row mx-0 mb-2">
{
   props. showMoveButtons ?
        <div className="col-4 d-flex align-items-center p-0">
            <MoveButtons {...props} />
        </div> : null
}
{
    props.showEditButton || props.showDeleteButton ?
        <div className="col d-flex justify-content-end align-items-center p-0">
            {
                props.showEditButton ?
                    <Button
                        onClick={() => props.onClickEdit(props.index)}
                        text={<FontAwesomeIcon icon={faPencilAlt} />}
                        className="plain-button p-1 text-primary small no-shadow mr-2"
                    /> : null
            }
            { props.showDeleteButton ? <DeleteButton {...props} /> : null }
        </div> : null
}
</div>;

ItemHeader.propTypes = {
    slug: PropTypes.string.isRequired,
    itemKey: PropTypes.string.isRequired,
    index: PropTypes.number,
    totalItems: PropTypes.number,
    showDeleteButton: PropTypes.bool,
    showMoveButtons: PropTypes.bool,
    showEditButton:PropTypes.bool,
    onClickEdit: PropTypes.func,
    requireUpdate: PropTypes.func,
};

export default ItemHeader;