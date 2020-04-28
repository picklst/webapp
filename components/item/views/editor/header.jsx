import React from "react";
import PropTypes from 'prop-types';


import { MoveButtons, DeleteButton } from "../../modules";

const EditorHeader = (props) =>
<div className="row mx-0 mb-2">
    {
        props.showMoveButtons ?
            <div className="col-4 d-flex align-items-center p-0">
                <MoveButtons {...props} />
            </div> : null
    }
    {
        props.showDeleteButton ?
        <div className="col d-flex justify-content-end align-items-center p-0">
          <DeleteButton {...props} />
        </div> : null
    }
</div>;

EditorHeader.propTypes = {
    slug: PropTypes.string.isRequired,
    itemKey: PropTypes.string.isRequired,
    index: PropTypes.number,
    totalItems: PropTypes.number,
    showDeleteButton: PropTypes.bool,
    showMoveButtons: PropTypes.bool,
    requireUpdate: PropTypes.func,
};

export default EditorHeader;