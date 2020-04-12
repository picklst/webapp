import React, {useState} from 'react';
import styled from 'styled-components';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import Button from "./Button";

const Container = styled.div`
    position: fixed;
    z-index: 9000;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 100vh;
    background: rgba(0,0,0,0.5);
    overflow-y: auto;
    @media (max-width: 480px) {
      align-items: flex-end
    }
`;

const Wrapper = styled.div`
    width: 100%;
    max-width: 720px;
    box-shadow: 5px 5px 5px rgba(0,0,0,0.5);
    @media (max-width: 480px) {
      padding-bottom: 8vh
    }
`;

const Topbar = styled.div`
    display: flex;
    z-index: 7000;
    margin-bottom: 0.5rem;
    position: sticky;
    box-shadow: 2px 3px 5px rgba(0,0,0,0.5);
    top: 0;
    left: 0;
    width: 100%;
    padding: 0.25rem;
    font-size: 1rem;
    border-bottom-color: #007bff!important;
    border-bottom: 3px solid;
`;

const CancelWarning = styled.div`
    z-index: 8000;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    background-color: rgba(0,0,0,0.8);
`;

const BottomPopup = ({
    children, title, discardLabel,
    showDiscardWarning = false,
    className, containerClassName,
    onClose
}) => {
    const [cancelWarning, showCancelWarning] = useState(false);

    return <Container className={containerClassName}>
        <Wrapper className={className}>
            <Topbar>
                <div style={{ width: '45px' }} className="d-flex align-items-center justify-content-center">
                    <button
                        onClick={() => showDiscardWarning ? showCancelWarning(true) : onClose()}
                        className="plain-button text-dark"
                    >
                        <FontAwesomeIcon icon={faTimes} size="lg" />
                    </button>
                </div>
                <div style={{ width: 'auto' }} className="d-flex align-items-center p-2">
                    <b>{ title ? title : null }</b>
                </div>
            </Topbar>
            <div className={className}>

            </div>
            {  showDiscardWarning && cancelWarning ?
                <CancelWarning>
                    <div className="text-center">
                        <h4 className="mb-3 text-white">
                            { discardLabel ? discardLabel : 'Discard Changes' }
                        </h4>
                        <Button
                            text="Cancel"
                            className="grey-button rounded-pill px-4 py-1 mr-2"
                            onClick={() => showCancelWarning(false)}
                        />
                        <Button
                            text="Discard"
                            className="red-button rounded-pill px-4 py-1 mr-2"
                            onClick={() => onClose()}
                        />
                    </div>
                </CancelWarning>
                : null
            }
            {children}
        </Wrapper>
    </Container>
};

export default BottomPopup;
