import React from 'react';
import { toast } from 'react-toastify';

import Button from "../../ui/Button";
import {APIRequest} from "../../../utils";

const emptyFun = () => {};

export default ({
    slug, id, index, totalItems,
    allowSave, requireUpdate = emptyFun,
    onMoveUp = emptyFun, onMoveDown = emptyFun
}) => {

    const moveItem = async (variables) => {
        const query = `
        mutation update_item($slug: String!, $id: String!, $direction: Direction!){
          itemMove(direction: $direction, id: $id, list: { slug: $slug })
        }`;
        return await APIRequest({ query, variables }).then((data) => {
            return { success: true };
        }).catch((errors) => {
            return { success: false, errors }
        });
    };

    const sendCallback = (direction) => {
        requireUpdate();
        if(direction === "up" && typeof onMoveUp === "function")
            onMoveUp(index);
        else if(direction === "down" && typeof onMoveDown === "function")
            onMoveDown(index);
    };

    const handleMoveItem = ({ direction }) => {
        if(allowSave) {
            moveItem({ id, direction, slug }).then(({ success, errors, data }) => {
                if(success)
                {
                    toast.success(
                        "Moved successfully",
                        {
                            autoClose: 1000, hideProgressBar: true, closeButton: false,
                            position: toast.POSITION.BOTTOM_CENTER,
                        }
                    );
                    sendCallback(direction);
                } else {
                    toast.error(
                        "Could not move due to an unknown error. Please try again.",
                        {
                            autoClose: 1000, hideProgressBar: true, closeButton: false,
                            position: toast.POSITION.BOTTOM_CENTER,
                        }
                    );
                }
            });
        } else { sendCallback(direction); }
    };

    return <div className="d-inline-block">
        {   index > 0 &&
            <Button
                onClick={() => handleMoveItem({ direction: "up" }) }
                className="p-1 text-dark small no-shadow mr-2"
                text={<i className="gg-chevron-double-up" />}
            />
        }
        { index+1 < totalItems  &&
            <Button
                onClick={() => handleMoveItem({ direction: "down"})}
                className="p-1 text-dark small no-shadow"
                text={<i className="gg-chevron-double-down" />}
            />
        }
    </div>

};