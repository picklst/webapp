import React from 'react';
import Modal from "react-modal";
import '../../styles/ui/popup.sass';

const PopUp = ({
   children, label = 'modal', appElement = false, className,
   isOpen = false,
   onClose,
}) => {
    if(appElement)
        Modal.setAppElement(appElement);

    return <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        className={className}
        overlayClassName="modal-overlay"
        contentLabel={label}
    >
        {children}
    </Modal>
};

export default PopUp;