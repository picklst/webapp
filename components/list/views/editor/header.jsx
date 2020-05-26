import React, {useEffect, useRef, useState} from "react";
import styled from '@emotion/styled';
import {clearAllBodyScrollLocks} from "body-scroll-lock";

import {Button, PopUp} from "../../../ui";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const HeaderBarContainer = styled.div`
  margin-bottom: 0.5rem;
  position: fixed;
  box-shadow: 2px 3px 5px rgba(0,0,0,0.5);
  top: 0;
  left: 0;
  width: 100%;
  padding: 0.25rem;
  font-size: 1rem;
  z-index: 6000;
`;

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

const defaultLabels = {
    discardText: "Changes you made might not be saved."
};

export default ({
    title, actionButton, enableWarning = true,
    labels: labelProps,
    onExit
}) => {

    const labels = {...defaultLabels, ...labelProps,};

    const [showWarning, setWarning] = useState(false);

    const handleExit = () => {
        clearAllBodyScrollLocks();
        onExit();
    };

    const [space, setSpacing] = useState('8vh');
    const topbarRef = useRef();
    useEffect(() => {
        if(topbarRef && topbarRef.current)
            setSpacing(topbarRef.current.clientHeight);
    }, []);

    return enableWarning && showWarning ?
    <CancelWarningWrapper
        isOpen
        showTopbarOnMobile={false}
        onClose={() => setWarning(false)}
        appElement=".app"
    >
        <div className="warning-container animated fadeInUp">
            <p className="mb-3">{labels.discardText}</p>
            <Button
                text="Discard" onClick={handleExit}
                className="bg-dark w-100 text-light rounded-pill mb-2"
            />
            <Button
                text="Cancel" onClick={() => setWarning(false)}
                className="grey-button w-100 rounded-pill"
            />
        </div>
    </CancelWarningWrapper> :
    <React.Fragment>
        <HeaderBarContainer ref={topbarRef} className="bg-white border-bottom-primary mb-0">
            <div className="row m-0">
                <div className="col-9 px-1">
                    <div className="d-flex p-1">
                        <div style={{ width: '45px' }} className="d-flex align-items-center justify-content-center">
                            <button
                                onClick={() => setWarning(true)}
                                className="plain-button text-dark"
                            >
                                <FontAwesomeIcon icon={faTimes} size="lg" />
                            </button>
                        </div>
                        <div style={{ width: 'auto' }} className="d-flex align-items-center font-weight-bold p-2">
                            {title}
                        </div>
                    </div>
                </div>
                <div className="col-3 d-flex justify-content-end px-2 px-md-4">
                    { actionButton }
                </div>
            </div>
        </HeaderBarContainer>
        <div style={{ height: space }} />
    </React.Fragment>
   ;
};