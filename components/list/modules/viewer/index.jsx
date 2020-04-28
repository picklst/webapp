import React, { useState } from 'react';
import shortid from 'shortid';
import classNames from 'classnames';

import { Card } from '../../views'
import { ItemCard } from '../../../item'
import PopUp from "../../../ui/PopUp";


const ListViewer = ({ slug, data, requireUpdate }) => {

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

    const renderListItems = () => {
        return data.items.map((i,index) =>
            <ItemCard
                key={i.key}
                slug={slug}
                itemKey={i.key}
                index={index}
                totalItems={data.items.length}

                name={i.name}
                comment={i.comment}
                url={i.url}
                media={i.media}
                className="mb-4 mt-2"

                userCanEdit={data.userCanEdit}

                showSaveButton

                requireUpdate={requireUpdate}

            />
        )
    };

    return <div className="row mx-0 mb-4">
        <div className="col-lg-3 p-2 p-md-0"/>
        <div className="col-md-6 p-0 p-md-2">
            <Card
                name={data.name}
                slug={slug}
                curator={data.curator}
                userCanEdit={data.userCanEdit}
                itemCount={data.itemCount}
                createdTimestamp={data.createdTimestamp}
                lastEditTimestamp={data.lastEditTimestamp}
                isTitleCard
            />
            <div className="pt-2 pb-5">
                { renderListItems() }
            </div>
        </div>
        <div className="col-lg-3 p-2 p-md-0"/>
        { showItemAdder ? renderItemAdder() : false }
    </div>;

};

export default ListViewer;