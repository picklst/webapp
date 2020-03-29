import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { motion } from "framer-motion";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp, faBan, faTrash, faBars } from "@fortawesome/free-solid-svg-icons";

import ListItemEditorHeader from "./header";
import ListItemContentEditor from "./contentEditor";

import "../../../styles/list/item-editor.sass";
import Card from "../../../components/ui/Cards";

const ListItemManager = ({
    data, index, totalItems,
    allowDeletion = true, isOpen = false, isRanked = false, isReordering = false,
    onChange, onOpen, onDelete, onMoveUp, onMoveDown, onDragStart, onDragEnd
}) => {
    const ref = useRef(null);

    const [title, setTitle] = useState(data.title);
    const [description, setDescription] = useState(data.description);
    const [url, setURL] = useState(data.url);
    const [entityID, setEntityID] = useState(data.entityID);

    const [isDragging, setDragging] = useState(false);
    const [dragMessage, setDragMessage] = useState({
        val: null,
        message: null
    });

    const [updateRequired, setUpdateRequired] = useState(false);
    useEffect(() => {
        if(updateRequired){
            sendData();
            setUpdateRequired(false);
        }
    });

    const sendData = () => {
        if(typeof onChange === "function")
            onChange({
                title,
                description,
                url,
                entityID
            });
    };

    const handleTitleInput = (val) => {
        setTitle(val);
        setUpdateRequired(true);
    };

    const handleDescriptionInput = (val) => {
        setDescription(val);
        setUpdateRequired(true);
    };

    const handleURLInput = (val) => {
        setURL(val);
        setUpdateRequired(true);
    };


    const handleDrag = ({ x, y }) => {
        if(x>5 || x<-5 || y>5 || y<-5)
        {
            if(y>5)
            {
                if(index+1 < totalItems)  setDragMessage({ message: "Move Down", val: "down" });
                else setDragMessage({ message: "Can't Move Down", val: "disabled" });
            }
            else if (y<-5) {
                if(index > 0) setDragMessage({ message: "Move Up", val: "up" });
                else setDragMessage({ message: "Can't Move Up", val: "disabled" });
            }
        } else setDragMessage({ message: null, val: null });
    };


    const handleDragStart = () => {
        setDragging(true);
        ref.current.className = "";
        if(typeof onDragStart === "function")
            onDragStart();

    };
    const constraintsRef = useRef(null);

    const handleDragEnd = ({ x, y }) => {
        ref.current.className = "transform-none";
        setDragging(false);
        setDragMessage({ message: null, val: null });
        if(typeof onDragEnd === "function")
            onDragEnd();
        if(y>5) onMoveDown(index);
        else if(y<-5) onMoveUp(index);
    };


    const renderDragCard = () => isDragging ?
    <div className={classNames('list-item-drag-message', dragMessage.val )}>
        <div>
            <span className="pr-2">
             {
                 dragMessage.val === "down" ?
                     <FontAwesomeIcon icon={faArrowDown} />
                     :  dragMessage.val === "up" ?
                     <FontAwesomeIcon icon={faArrowUp} />
                     : dragMessage.val === "delete" ?
                         <FontAwesomeIcon icon={faTrash} />
                         : dragMessage.val === "disabled" ?
                             <FontAwesomeIcon icon={faBan} />
                             : null
             }
            </span>
            {dragMessage.message}
        </div>
    </div>
    : null;

    const renderCollapsedItem =
    <div className="d-flex align-items-center ml-2">
        <h5 className="m-0">{title ? title : 'Untitled Item'}</h5>
    </div>;

    const renderItemCard =
    <Card className={classNames("list-item-editor", !isReordering ? "rounded my-3" : "rounded-right-0" )} p={2}>
        {renderDragCard()}
        <ListItemEditorHeader
            index={index}
            totalItems={totalItems}
            itemID={data.itemID}
            isOpen={isOpen && !isReordering}
            isRanked={isRanked}
            allowDeletion={allowDeletion}
            allowEditing={!isReordering}
            onMoveUp={onMoveUp}
            onMoveDown={onMoveDown}
            onDelete={onDelete}
            onOpen={onOpen}
        />
        { isOpen && !isReordering ?
            <ListItemContentEditor
                title={title}
                description={description}
                url={url}
                entityID={entityID}
                onChangeTitle={handleTitleInput}
                onChangeDescription={handleDescriptionInput}
                // onFetchURL={(d) => handleLinkLoaded(d)}
                // onDeleteURL={() => handleURLInput(null)}
                onURLInput={handleURLInput}
                // onEntityInput={handleEntityInput}
            />
            : renderCollapsedItem
        }
    </Card>;

    return <div>
        {
            isReordering ?
                <div className="d-flex mx-0 my-3">
                    <div className="p-0" style={{ maxWidth: '90%', width: '100vw' }}>
                        {renderItemCard}
                    </div>
                    <div style={{ width: '20%', minWidth: '80px' }} className="d-flex align-items-center justify-content-center rounded-right bg-primary text-light p-1">
                        <div ref={constraintsRef} className="p-2">
                            <motion.div
                                ref={ref}
                                initial={false}
                                dragOriginY={0}
                                dragOriginX={0}
                                drag={isReordering ? 'y' : false}
                                dragMomentum={false}
                                dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
                                dragConstraints={constraintsRef}
                                dragElastic={0}
                                onDragStart={handleDragStart}
                                onDrag={(e, {point}) => handleDrag(point)}
                                onDragEnd={(e, { point }) => handleDragEnd(point)}
                                transition={{ duration: 0.15, delay: 1 }}
                                whileHover={{ scale: 1.02 }}
                            >
                                <button className="plain-button text-light rearrange-button">
                                    {
                                        dragMessage.val === "down" ?
                                            <FontAwesomeIcon icon={faArrowDown} size="lg" />
                                            :  dragMessage.val === "up" ?
                                            <FontAwesomeIcon icon={faArrowUp}  size="lg"/>
                                            : dragMessage.val === "disabled" ?
                                                <FontAwesomeIcon icon={faBan}  size="lg" />
                                                : <FontAwesomeIcon icon={faBars}  size="lg" />
                                    }
                                </button>
                            </motion.div>
                        </div>
                    </div>
                </div>
                : renderItemCard
        }
    </div>
};

ListItemManager.propTypes = {
    data: PropTypes.shape({
        itemID: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string,
        url: PropTypes.string,
        entityID: PropTypes.string,
    }).isRequired,
    index: PropTypes.number.isRequired,
    isOpen: PropTypes.bool,
    allowDeletion: PropTypes.bool,
    isReordering: PropTypes.bool,
    totalItems: PropTypes.number,
    onChange: PropTypes.func,
    onOpen: PropTypes.func,
    onDelete: PropTypes.func,
    onMoveUp: PropTypes.func,
    onMoveDown: PropTypes.func,
    onDragStart: PropTypes.func,
    onDragEnd: PropTypes.func
};

export default ListItemManager;