import React, {useState} from 'react';
import styled from '@emotion/styled'
import Button from "./Button";
import classNames from 'classnames';

const DropDownWrapper = styled.div`
  position: absolute;
  right: 0;
  width: auto;
  min-width: 220px;
  z-index: 900;
`;

const DropDown = ({
    customTrigger, triggerComponent, dropdownComponent,
    isOpen = false,
    onClose, className, dropDownClassName
}) => {

    const [isOpened, setOpen] = useState(isOpen);

    const handleBlur = (e) => {
        const currentTarget = e.currentTarget;
        setTimeout(() => {
            if (!currentTarget.contains(document.activeElement)) {
                setOpen(false);
                if(typeof onClose === "function") onClose();
            }
        }, 0);
    };

    return <div
        className={classNames("position-relative", className)}
        onBlur={handleBlur}
    >
        {
            customTrigger && <div className="d-flex align-items-center">
                {customTrigger}
            </div>
        }
        {triggerComponent && <div className="d-flex align-items-center">
            <Button
                className="plain-button no-shadow p-0"
                onClick={() => { setOpen(!isOpened)}}
                text={triggerComponent}
            />
        </div>}
        {   isOpened || (isOpen && customTrigger) ?
            <DropDownWrapper className={dropDownClassName} onClick={() => setOpen(false)}>
                {dropdownComponent}
            </DropDownWrapper> : null
        }
    </div>

};

export default DropDown;