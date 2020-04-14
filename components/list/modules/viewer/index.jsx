import React, { useState } from 'react';
import shortid from 'shortid';
import classNames from 'classnames';

import { ItemCard } from '../../../item'
import PopUp from "../../../ui/PopUp";
import ListHeaderViewer from "../../views/viewer/header";


const ListViewer = ({ slug, data, requireUpdate }) => {

    const [isEditing, setEditMode] = useState(false);
    const handleEnableEdit = () => { setEditMode(true); };

    const handleRequireUpdate = () => {
        setCurrItem(null);
        if(typeof requireUpdate === 'function')
            requireUpdate();
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
                key={shortid.generate()}
                className="my-0"
                index={data.items.length + 1}
                totalItems={data.items.length}

                slug={slug}
                itemKey={shortid.generate()}

                isEditable

                enableSaving
                labels={{ 'save': "Add Item" }}

                requireUpdate={() => console.log('null')}
            />
        </PopUp>
    };

    const [currItem, setCurrItem] = useState(null);
    const renderListItems = () => {
        return data.items.map((i,index) =>
            <ItemCard
                key={i.key}
                className="mb-4 mt-2"

                index={index}
                totalItems={data.items.length}

                slug={slug}
                itemKey={i.key}
                name={i.name}
                comment={i.comment}
                url={i.url}
                media={i.media}

                onEdit={(i) => { setCurrItem(i)}}
                isEditing={currItem===index}
                showEditButton={isEditing && currItem !== index}
                showMoveButton={isEditing && currItem === null}
                showDeleteButton={isEditing && currItem !== index}
                showSaveButton

                requireUpdate={handleRequireUpdate}

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
        { showItemAdder ? renderItemAdder() : false }
    </div>;

};

export default ListViewer;