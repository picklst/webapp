import React, {useEffect, useRef, useState} from 'react';
import styled from '@emotion/styled'
import { useMediaQuery } from 'react-responsive';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

import Button from "./Button";
import {motion} from "framer-motion";

const Container = styled.div`
    position: fixed;
    z-index: 8500;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 100vh;
    background: rgba(0,0,0,0.5);
    @media (max-width: 480px) {
      align-items: flex-end
    }
`;

const Wrapper = styled(motion.div)`
    width: 100%;
    max-width: ${({maxWidth}) => maxWidth ? maxWidth : '720px'};
    box-shadow: 2px 5px 15px rgba(0,0,0,0.5);
    background: white;
`;

const Topbar = styled.div`
    display: flex;
    z-index: 7000;
    margin-bottom: 0.5rem;
    position: fixed;
    background-color: white;
    box-shadow: 2px 3px 5px rgba(0,0,0,0.5);
    top: 0;
    left: 0;
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    i {
      --ggs: 1.3
    }
    &::after{
        content: "";
        height: 3px;
        animation: gradient 2s infinite;
        background: linear-gradient(-45deg,#0CC1B0,#0AA5C3);
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        @keyframes gradient { 
          0% { background: linear-gradient(-45deg,#0CC1B0,#0AA5C3); } 
          50% { background: linear-gradient(0deg,#0CC1B0,#0AA5C3); } 
          100% { background: linear-gradient(45deg,#0CC1B0,#0AA5C3); } 
        }
    }
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

const ContentWrapper = styled.div`
    max-height: 100vh;
    overflow-y: auto;
    margin: 1rem 0;
`;

const BottomPopup = ({
    children, title, discardLabel, maxWidth,
    isOpen = true, appElement = ".app", showDiscardWarning = false,
    className, containerClassName, contentClassName,
    onClose
}) => {
    const [cancelWarning, showCancelWarning] = useState(false);

    useEffect(() => {
        const targetElement = document.querySelector(appElement);
        if(isOpen)
            disableBodyScroll(targetElement);
    }, [isOpen]);

    const handleOnClose = (e) => {
        e.stopPropagation();
        const targetElement = document.querySelector(appElement);
        enableBodyScroll(targetElement);
        clearAllBodyScrollLocks();
        onClose();
    };

    const [space, setSpacing] = useState('8vh');
    const topbarRef = useRef();
    useEffect(() => {
        if(topbarRef && topbarRef.current)
            setSpacing(topbarRef.current.clientHeight);
    }, [topbarRef]);

    const isMobile = useMediaQuery({
        query: '(max-width: 768px)'
    });

    return <Container onClick={(e) => e.stopPropagation()} className={containerClassName}>
        <Wrapper
            maxWidth={maxWidth}
            initial={{ translateY: "8vh", opacity: 0.5 }}
            animate={{ translateY: 0, opacity: 1 }}
            exit={{ display: "none", opacity: 0 }}
            transition={{
                type: "tween",
                stiffness: 60,
                damping: 15
            }}
            className={className}
        >
            <Topbar ref={topbarRef}>
                <div style={{ width: '45px' }} className="d-flex align-items-center justify-content-center">
                    <button
                        onClick={(e) => showDiscardWarning ? showCancelWarning(true) : handleOnClose(e)}
                        className="plain-button text-dark"
                    >
                        <i className="gg-close" />
                    </button>
                </div>
                <div style={{ width: 'auto' }} className="d-flex align-items-center p-2">
                    <b>{ title }</b>
                </div>
            </Topbar>
            <div style={{ height: space }} />
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
                            onClick={() => handleOnClose()}
                        />
                    </div>
                </CancelWarning>
                : null
            }
            <ContentWrapper className={contentClassName}>
                {children}
                {isMobile && <div style={{ height: '56px' }} />}
            </ContentWrapper>
        </Wrapper>
    </Container>
};

export default BottomPopup;
