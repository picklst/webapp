import React, {useState} from 'react';
import shortid from 'shortid';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import ListItemManager from "../item/manager";
import Button from "../../../components/ui/Button";

const generateItemObj = () => {
    return { key: shortid.generate(), }
};

const ListManager = ({ items : it, isRankedListing, onChange }) => {
    const [items, setItems] = useState( it ? it : [generateItemObj()]);
    const [currentItem, setCurrentItem] = useState( null);

    const handleUpdation = (items) => {
        if(typeof onChange === "function")
            onChange(items);
    };

    const handleItemDataChange = (val, index) => {
        val.key = items[index].key;
        items[index] = val;
        setItems(items);
        handleUpdation(items);
    };

    const handleCreateItem = () => {
        const newItem = generateItemObj();
        setItems([...items, newItem]);
        setCurrentItem(items.length);
        handleUpdation([...items, newItem]);
    };

    const handleItemDelete = (index) => {
        setItems((p) => [
            ...p.slice(0,index),
            ...p.slice(index+1)
        ]);
        handleUpdation([
            ...items.slice(0,index),
            ...items.slice(index+1)
        ]);
    };

    const handleMoveUp = (index) => {
        if(index > 0)
        {
            const l = [...items];
            const temp = l[index-1];
            l[index-1] = l[index];
            l[index] = temp;
            setItems(l);
            handleUpdation(l);
        }
    };

    const handleMoveDown = (index) => {
        if(index + 1 < items.length)
        {
            const l = [...items];
            const temp = l[index+1];
            l[index+1] = l[index];
            l[index] = temp;
            setItems(l);
            handleUpdation(l);
        }
    };


    const reorder = (startIndex, endIndex) => {
        const result = items;
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    };

    const handleDragEnd = (result) => {
        if (!result.destination) {
            setDragging(false);
            return;
        }
        const items = reorder(
            result.source.index,
            result.destination.index,
        );
        setItems(items);
        setDragging(false);
        handleUpdation(items);
    };

    const renderAddFloatingButton =
    <div id="list-editor-floating-buttons">
        <Button
            onClick={handleCreateItem}
            text={<FontAwesomeIcon icon={faPlus} />}
            className="add-button bg-primary text-light large-button"
        />
    </div>;


    const [isDragging, setDragging] = useState(false);
    return <div className="p-2">
        {renderAddFloatingButton}
        <DragDropContext
            onDragStart={() => setDragging(true)}
            onDragEnd={handleDragEnd}
        >
            <Droppable droppableId="droppable">
                {(droppableProvided, droppableSnapshot) => (
                    <div
                        ref={droppableProvided.innerRef}
                    >
                    {items.map((data,i) =>
                        <Draggable
                            key={data.key}
                            draggableId={data.key}
                            index={i}
                        >
                        {(draggableProvided, draggableSnapshot) => (
                            <div
                                ref={draggableProvided.innerRef}
                                {...draggableProvided.draggableProps}
                                {...draggableProvided.dragHandleProps}
                            >
                                <ListItemManager
                                    isReordering={isDragging}
                                    key={i.key}
                                    isRanked={isRankedListing}
                                    data={data}
                                    index={i}
                                    totalItems={items.length}
                                    isOpen={currentItem === i || items.length === 1}
                                    allowDeletion
                                    onOpen={setCurrentItem}
                                    onDelete={handleItemDelete}
                                    onMoveUp={handleMoveUp}
                                    onMoveDown={handleMoveDown}
                                    onChange={(data) => handleItemDataChange(data, i)}
                                />
                            </div>
                        )}
                        </Draggable>
                    )}
                    {droppableProvided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    </div>

};
export default ListManager;