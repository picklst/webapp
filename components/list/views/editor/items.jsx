import React, {useState} from "react";
import shortid from "shortid";
import styled from '@emotion/styled';
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";

import { Button } from "../../../ui";

import {ItemCard} from "../../../item";

const FloatingButton = styled(Button)`
    position: fixed;
    bottom: 1.5rem;
    right: 1.25rem;
    z-index: 5000;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    i {
      --ggs: 1.2
    }
`;

export default ({
    items, isRankedListing, currentItem,
    onOpen, onCreate, onChange, onDelete, onMoveUp, onMoveDown, onDragEnd,
}) => {

    const renderAddFloatingButton =
    <FloatingButton
        brandAccent
        onClick={onCreate}
        text={<div><i className="gg-math-plus" /></div>}
    />;

    const [isDragging, setDragging] = useState(false);
    return <div className="p-2">
        {renderAddFloatingButton}
        <DragDropContext
            onDragStart={() => setDragging(true)}
            onDragEnd={(result) => { setDragging(false); onDragEnd(result) }}
        >
            <Droppable droppableId="droppable">
                {(droppableProvided, droppableSnapshot) => (
                    <div
                        ref={droppableProvided.innerRef}
                    >
                        {items.map((data,i) =>
                            <Draggable
                                key={data.id || shortid.generate()}
                                draggableId={data.id}
                                index={i}
                            >
                                {(draggableProvided, draggableSnapshot) => (
                                    <div
                                        className="animated fadeIn my-2"
                                        ref={draggableProvided.innerRef}
                                        {...draggableProvided.draggableProps}
                                        {...draggableProvided.dragHandleProps}
                                    >
                                        <ItemCard
                                            key={data.id || shortid.generate()}

                                            index={i}
                                            totalItems={items.length}

                                            id={data.id}
                                            name={data.name}
                                            comment={data.comment}
                                            url={data.url}
                                            media={data.media}

                                            isEditing={currentItem === data.id || items.length === 1}
                                            userCanEdit
                                            showEditButton={!isDragging}
                                            showDeleteButton={!isDragging && items.length > 1}
                                            showMoveButtons={!isDragging}

                                            allowSave={false}
                                            onEdit={onOpen}
                                            onDelete={onDelete}
                                            onMoveUp={onMoveUp}
                                            onMoveDown={onMoveDown}
                                            onChange={(data) => onChange(data, i)}
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

}