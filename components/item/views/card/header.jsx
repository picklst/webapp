import React from "react";

import Action from './actions';

const ItemHeader = ({ name , userCanEdit, onEdit }) =>
<div className="row mx-0 mb-2">
    <div className="col-10 d-flex align-items-center p-0">
        <h3 className="mb-0">{name}</h3>
    </div>
    <div className="col-2 d-flex justify-content-end align-items-center px-2">
        <Action userCanEdit={userCanEdit} onEdit={onEdit} />
    </div>
</div>;

export default ItemHeader;