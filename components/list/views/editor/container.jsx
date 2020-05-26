import React from "react";
import { ToastContainer } from 'react-toastify';
import { useBeforeunload } from 'react-beforeunload';

import styled from '@emotion/styled'

import {PopUp} from "../../../ui";

import Header from "./header";


const ListEditorWrap = styled(PopUp)`
    height: 100vh;
    width: 100vw;
    overflow-y: auto;
    background-color: #EEE;
`;

const ItemsWrap = styled.div`
    max-width: 720px;
    width: 100%;
`;

const defaultLabels = {
    'topbarTitle': "Create Your List",
};

export default ({
    actionButton, header, items,
    showPopupOnExit = true, showWarningOnExit = true,
    labels: labelProps,
    onExit,
}) => {
    const labels = {...defaultLabels, ...labelProps};
    if(showPopupOnExit)
    {   useBeforeunload(event => event.preventDefault()); }


    return <ListEditorWrap isOpen showTopbarOnMobile={false}>
        <Header
            title={labels.topbarTitle}
            labels={labels}
            actionButton={actionButton}
            enableWarning={showWarningOnExit}
            onExit={onExit}
        />
        <div className="container-lg p-0">
            <div className="row m-0">
                <div className="col-md-4 px-md-2 mt-4 p-0">
                    <div className="position-sticky">
                        {header}
                    </div>
                </div>
                <div className="col-md-8 d-flex justify-content-center p-0 mb-5">
                    <ItemsWrap>
                        {items}
                    </ItemsWrap>
                </div>
            </div>
            <ToastContainer />
        </div>
    </ListEditorWrap>
}