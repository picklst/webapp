import React from "react";
import PropTypes from 'prop-types';

import { MoveButtons, DeleteButton } from "../../modules";

import { Button } from "../../../ui";

const EditorHeader = (props) =>
<div className="row mx-0 mb-2">
    {   props.showMoveButtons &&
        <div className="col-4 d-flex align-items-center p-0">
            <MoveButtons {...props} />
        </div>
    }
    <div className="col d-flex justify-content-end align-items-center p-0">
        { props.showEditButton &&
            <Button
                text="Edit"
                className="p-2 text-primary small no-shadow"
                onClick={() => props.onEdit(props.id)}
            />
        }
        { props.showDeleteButton && props.totalItems > 1 ? <DeleteButton {...props} /> : null }
    </div>
</div>;

EditorHeader.propTypes = {
    slug: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    index: PropTypes.number,
    totalItems: PropTypes.number,
    showDeleteButton: PropTypes.bool,
    showMoveButtons: PropTypes.bool,
    showEditButton: PropTypes.bool,
    requireUpdate: PropTypes.func,
};

export default EditorHeader;