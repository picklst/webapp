import React, {useState} from "react";
import { toast } from 'react-toastify';
import styled from '@emotion/styled'
import {clearAllBodyScrollLocks} from "body-scroll-lock";

import {Button, PopUp} from "../../ui";
import {APIRequest} from "../../../utils";

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

export default ({
    slug, skipButton, onDelete, onCancel
}) => {
    const [showWarning, setWarning] = useState(skipButton);

    const deleteItem = async (variables) => {
        const query = `
        mutation delete_list($slug: String!){
          listDelete(list: { slug: $slug })
        }`;
        return await APIRequest({ query, variables }).then((data) => {
            return { success: true };
        }).catch((errors) => {
            return { success: false, errors }
        });
    };

    const handleDelete = () => {
        clearAllBodyScrollLocks();
        deleteItem({ slug }).then(({ success, errors, data }) => {
            if (success) {
                if(typeof onDelete === "function")
                    onDelete();
                toast.success(
                    "Deleted successfully",
                    {
                        autoClose: 1000, hideProgressBar: true, closeButton: false,
                        position: toast.POSITION.BOTTOM_CENTER,
                    }
                );
            } else {
                if(typeof onCancel === "function")
                    onCancel();
                toast.error(
                    "Could not delete due to an unknown error. Please try again.",
                    {
                        autoClose: 1000, hideProgressBar: true, closeButton: false,
                        position: toast.POSITION.BOTTOM_CENTER,
                    }
                );
            }
        })
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
            <p className="mb-3">Are you sure to delete this list?</p>
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
        text="Delete"
        className="text-danger"
        onClick={() => setWarning(true)}
    />
}