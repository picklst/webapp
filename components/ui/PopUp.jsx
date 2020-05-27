import React, {useEffect, useRef, useState} from 'react';
import Modal from "react-modal";
import styled from '@emotion/styled'
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import classNames from "classnames";

import '../../styles/ui/popup.sass';

const Topbar = styled.div`
    display: flex;
    z-index: 7000;
    margin-bottom: 0.5rem;
    position: absolute;
    background-color: white;
    top: 0;
    left: 0;
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    min-height: 7.5vh;
    i {
      --ggs: 1.3
    }
`;

const PopUp = ({
   children, title, label = 'modal', appElement = '.app', className, button,
   isOpen = false, onClose, showTopbarOnMobile = true, showTopbar = false
}) => {

    useEffect(() => {
        const targetElement = document.querySelector(appElement);
        if(isOpen)
            disableBodyScroll(targetElement);
    }, [isOpen]);

    const handleOnClose = () => {
        const targetElement = document.querySelector(appElement);
        enableBodyScroll(targetElement);
        clearAllBodyScrollLocks();
        onClose();
    };

    if(appElement)
        Modal.setAppElement(appElement);

    const [space, setSpacing] = useState('8vh');
    const topbarRef = useRef();
    useEffect(() => {
        if(topbarRef && topbarRef.current)
            setSpacing(topbarRef.current.clientHeight);
    }, []);

    const renderTopbar = () =>
    <React.Fragment>
        <Topbar className="popup-topbar" ref={topbarRef}>
            <div style={{ width: '45px', maxWidth: '15%' }} className="d-flex align-items-center justify-content-center">
                <button onClick={handleOnClose} className="plain-button p-2 text-dark">
                    <i className="gg-close" />
                </button>
            </div>
            {title &&
            <div style={{ width: 'auto', minWidth: '85%' }} className="d-flex align-items-center px-2">
                <b>{ title }</b>
            </div>
            }
            {button &&
            <div style={{ width: 'auto', minWidth: '85%' }} className="d-flex align-items-center justify-content-end px-2">
                {button}
            </div>
            }
        </Topbar>
        <div style={{ height: space, width: '100%' }} />
    </React.Fragment>;

    return <Modal
        isOpen={isOpen}
        onRequestClose={handleOnClose}
        className={classNames("modal-container position-relative", className)}
        overlayClassName="modal-overlay"
        contentLabel={label}
    >
        <div>
            {showTopbar ? renderTopbar() : showTopbarOnMobile && <div className="d-md-none d-flex">{renderTopbar()}</div>}
            {children}
        </div>
    </Modal>
};

export default PopUp;