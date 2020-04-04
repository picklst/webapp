import React, {useState} from 'react';
import shortid from 'shortid';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import ListItemManager from "../item/manager";
import Button from "../../../components/ui/Button";

const generateItemObj = () => {
    return { itemID: shortid.generate() }
};

const ListManager = ({ items : it, isRankedListing, onChange }) => {
    const [items, setItems] = useState( it ? it : [generateItemObj()]);
    const [currentItem, setCurrentItem] = useState(null);

    const handleUpdation = (items) => {
        items.forEach((i, index) => { i.position = index + 1 });
        if(typeof onChange === "function")
            onChange(items);
    };

    const handleItemDataChange = (val, index) => {
        val.itemID = items[index].itemID;
        items[index] = val;
        setItems(items);
        handleUpdation(items);
    };

    const handleCreateItem = () => {
        const newItem = generateItemObj();
        setCurrentItem(newItem.itemID);
        setItems([...items, newItem]);
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

    const renderAddFloatingButton =
    <div id="list-editor-floating-buttons">
        <Button
            onClick={handleCreateItem}
            text={<FontAwesomeIcon icon={faPlus} />}
            className="add-button bg-primary text-light large-button"
        />
    </div>;

    return <div>
        {renderAddFloatingButton}
        {
            items.map((data,i) =>
                <ListItemManager
                    key={shortid.generate()}
                    isRanked={isRankedListing}
                    data={data}
                    index={i}
                    totalItems={items.length}
                    isOpen={currentItem === data.itemID || items.length === 1}
                    allowDeletion
                    onOpen={setCurrentItem}
                    onDelete={handleItemDelete}
                    onMoveUp={handleMoveUp}
                    onMoveDown={handleMoveDown}
                    onChange={(data) => handleItemDataChange(data, i)}
                />
            )
        }
    </div>

};
export default ListManager;