import React from 'react';

import Button from "../../../ui/Button";
import Card from "../../../ui/Cards";

export default ({
    name, curator,
    showEditButton, showAddItemButton,
    onAdd, onEdit
}) =>
<Card
    hasShadow
    className="mb-4 p-4 rounded-0"
>
    <h1 className="line-height-1">{name}</h1>
    <div>By {curator.firstName} {curator.lastName}</div>
    <div className="my-4 d-flex">
        {
            showEditButton ?
                <Button
                    className="small-button text-light bg-primary mx-1 no-shadow"
                    text={
                        <div>
                            Edit List
                        </div>
                    }
                    onClick={onEdit}
                /> : null
        }
        {
            showAddItemButton ?
                <Button
                    className="small-button bg-warning mx-1 no-shadow"
                    text={
                        <div>
                            Add Item
                        </div>
                    }
                    onClick={onAdd}
                />
                : null
        }
    </div>
</Card>;