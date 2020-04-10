import React, { useState } from 'react';
import shortid from 'shortid';
import classNames from 'classnames';

import ItemCard from "../cards/item";
import ListHeaderViewer from "./list/header";
import PopUp from "../../components/ui/PopUp";

const ListViewer = ({
    slug, data,
    onAddItem, onEditItem, onDeleteItem, onMove
}) => {

    const [isEditing, setEditMode] = useState(false);
    const handleEnableEdit = () => { setEditMode(true); };

    const handleAddItem = (v) => {
        const position = data.items && typeof data.items.length === "number" ? data.items.length + 1 : 1;
        if(typeof onAddItem === "function")
            onAddItem({
               name: v.name,
               comment: v.comment,
               key: v.itemKey,
               url: v.url,
               position
            });
        setShowItemAdder(false);
    };

    const handleEditItem = (v, position) => {
        if(typeof onEditItem === "function")
            onEditItem({
                name: v.name,
                comment: v.comment,
                key: v.itemKey,
                url: v.url,
                tags: v.tags,
                position
            });
        setCurrItem(null);
    };

    const [showItemAdder, setShowItemAdder] = useState(false);
    const renderItemAdder = () => {
        return <PopUp
            isOpen
            onClose={() => setShowItemAdder(false)}
            label="Item Adder"
            className="p-0 container"
            appElement=".app"
        >
            <ItemCard
                index={data.items.length + 1}
                totalItems={data.items.length}

                className="my-0"
                key={shortid.generate()}
                itemKey={shortid.generate()}

                allowEditing
                isEditing
                enableSaving
                labels={{
                    'save': "Add Item"
                }}
                onSave={handleAddItem}
            />
        </PopUp>
    };

    const [currItem, setCurrItem] = useState(null);
    const renderListItems = () => {
        return data.items.map((i,index) =>
            <ItemCard
                key={i.key}

                index={index}
                totalItems={data.items.length}
                className="mb-4 mt-2"

                itemKey={i.key}
                name={i.name}
                comment={i.comment}
                url={i.url}

                allowEditing={isEditing && (currItem === null || currItem===index)}
                showMoveButton={isEditing && currItem === null}
                showDeleteButton={isEditing}
                enableSaving
                isEditing={currItem===index}
                onEdit={(i) => { setCurrItem(i) }}
                onDelete={() => onDeleteItem(i.key)}
                onSave={(v) => handleEditItem(v, index+1)}
                onMoveUp={() => onMove({ key: i.key, direction: "up" })}
                onMoveDown={() => onMove({ key: i.key, direction: "down" })}
            />
        )
    };

    return <div className="container p-0">
        <ListHeaderViewer
            name={data.name}
            curator={data.curator}
            showEditButton={!isEditing}
            showAddItemButton
            onEdit={handleEnableEdit}
            onAdd={() => setShowItemAdder(true)}
        />
        <div className="p-2 p-md-0">
            { renderListItems() }
        </div>
        { showItemAdder ?
            renderItemAdder() : false
        }
    </div>;

};

export default ListViewer;