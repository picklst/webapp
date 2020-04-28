import React, {useState} from 'react';
import Button from "./Button";

const DropDown = ({
    triggerComponent, dropdownComponent,
}) => {

    const [isOpen, setOpen] = useState(false);

    const handleBlur = (e) => {
        const currentTarget = e.currentTarget;
        setTimeout(() => {
            if (!currentTarget.contains(document.activeElement)) {
                setOpen(false);
            }
        }, 0);
    };

    return <div
        className="position-relative"
        onBlur={handleBlur}
    >
        <Button
            className="plain-button no-shadow p-0"
            onClick={() => { setOpen(!isOpen)}}
            text={triggerComponent}
        />
        {
            isOpen ?
                <div
                    className="position-absolute"
                    style={{
                        right: '0',
                        minWidth: '220px',
                        width: 'auto'
                    }}
                >
                    {dropdownComponent}
                </div> : null
        }
    </div>

};

export default DropDown;