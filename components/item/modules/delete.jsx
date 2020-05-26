import React, {useState} from 'react';
import { toast } from 'react-toastify';
import styled from '@emotion/styled'
import {clearAllBodyScrollLocks} from "body-scroll-lock";

import { APIRequest } from "../../../utils";
import {Button, PopUp} from "../../ui/";

const emptyFun = () => {};

const CancelWarningWrapper = styled(PopUp)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto!important;
  height: auto!important;
  background: none!important;
  .warning-container {
    text-align: center;
    background: white;
    color: black;
    padding: 2rem;
    border-radius: 2rem;
    margin: 0 5vw
  }
`;

export default ({ id, index, slug,  allowSave, skipButton, onDelete = emptyFun, onCancel }) => {

    const [showWarning, setWarning] = useState(skipButton);

    const deleteItem = async (variables) => {
        const query = `
        mutation delete_item($slug: String!, $id: String!){
          itemDelete(id: $id, list: { slug: $slug })
        }`;
        return await APIRequest({ query, variables }).then((data) => {
            return { success: true };
        }).catch((errors) => {
            return { success: false, errors }
        });
    };

    const handleDelete = () => {
        clearAllBodyScrollLocks();
        if(allowSave)
            deleteItem({ id, slug }).then(({ success, errors, data }) => {
                if(success)
                {
                    toast.success(
                        "Deleted successfully",
                        {
                            autoClose: 1000, hideProgressBar: true, closeButton: false,
                            position: toast.POSITION.BOTTOM_CENTER,
                        }
                    );
                    onDelete(index);
                } else {
                    toast.error(
                        "Could not delete due to an unknown error. Please try again.",
                        {
                            autoClose: 1000, hideProgressBar: true, closeButton: false,
                            position: toast.POSITION.BOTTOM_CENTER,
                        }
                    );
                }
            });
        else onDelete(index);
    };

    const handleCancel = () => {
        clearAllBodyScrollLocks();
        setWarning(false);
        if(typeof onCancel === "function")
            onCancel()
    };

    return showWarning ?
        <CancelWarningWrapper
            isOpen
            showTopbarOnMobile={false}
            onClose={() => setWarning(false)}
            appElement=".app"
        >
            <div className="warning-container animated fadeInUp">
                <p className="mb-3">Are you sure to delete this item?</p>
                <Button
                    text="Delete" onClick={handleDelete}
                    className="bg-danger w-100 text-light rounded-pill mb-2"
                />
                <Button
                    text="Cancel" onClick={handleCancel}
                    className="grey-button w-100 rounded-pill"
                />
            </div>
        </CancelWarningWrapper> : <Button
        text={<i className="gg-trash" />}
        className="p-2 text-danger small no-shadow"
        onClick={() => setWarning(true)}
    />;

};