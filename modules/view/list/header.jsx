import React from "react";
import Card from "../../../components/ui/Cards";
import Button from "../../../components/ui/Button";

const ListHeaderViewer = ({
    name, curator,
    showEditButton, showAddItemButton,
    onEdit, onAdd
}) => {

    return <Card
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
    </Card>
};

export default ListHeaderViewer;