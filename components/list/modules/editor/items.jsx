import React, {useEffect, useState} from "react";
import shortid from "shortid";

import { ItemsManager } from "../../views";

export default ({ items: itemsProp = false, onChange }) => {

    const generateItemObj = () => {
        return { id: shortid.generate(), }
    };

    const [items, setItems] = useState( itemsProp || [generateItemObj()]);
    const [currentItem, setCurrentItem] = useState( 0);

    useEffect(() => {
        if(typeof onChange === "function")
            onChange(items);
    }, [items]);

    const handleItemDataChange = (val, index) => {
        val.id = items[index].id;
        items[index] = val;
        setItems(items);
    };

    const handleCreateItem = () => {
        const newItem = generateItemObj();
        setItems([...items, newItem]);
        setCurrentItem(newItem.id);
    };

    const handleItemDelete = (index) => {
        setItems((p) => [
            ...p.slice(0,index),
            ...p.slice(index+1)
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
            return;
        }
        const items = reorder(
            result.source.index,
            result.destination.index,
        );
        setItems(items);
    };

    return <ItemsManager
        items={items}
        currentItem={currentItem}
        onOpen={setCurrentItem}
        onCreate={handleCreateItem}
        onChange={handleItemDataChange}
        onDelete={handleItemDelete}
        onMoveUp={handleMoveUp}
        onMoveDown={handleMoveDown}
        onDragEnd={handleDragEnd}
    />

}