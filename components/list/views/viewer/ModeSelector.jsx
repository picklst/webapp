import React, {useState} from "react";
import styled from '@emotion/styled'

import {BottomPopup, Button} from "../../../ui";
import {clearAllBodyScrollLocks} from "body-scroll-lock";

const OptionButton = styled(Button)`
    background: ${({isSelected}) => isSelected ? `#01579B!important` : `#EEEEEE`};
    color: ${({isSelected}) => isSelected ? `#EEEEEE!important` : `#01579B`};
    margin: 0.25rem 0;
    padding: 0.75rem;
    width: 100%;
    img {
      filter: ${({isSelected}) => isSelected ? `brightness(100)` : null};
    }
`;

export default ({ value, onChange }) => {

    const [isOpen, setOpen] = useState(false);

    const handleChange = (val) => {
        clearAllBodyScrollLocks();
        setOpen(false);
        onChange(val);
    };

    const modesList = [
        {
            "value": "card",
            "label": "Cards",
            "icon": require('../../../../images/icons/Card.png')
        },
        {
            "value": "slides",
            "label": "Slides",
            "icon": require('../../../../images/icons/Slides.png')
        },
        {
            "value": "compact",
            "label": "Compact Cards",
            "icon": require('../../../../images/icons/Compact.png')
        },
        {
            "value": "grid",
            "label": "Grid",
            "icon": require('../../../../images/icons/Grid.png')
        }
    ];

    const renderCurrentType = () => {
        let type = modesList[0];
        modesList.forEach(m => { if(m.value === value) type = m; });
        return <Button
            className="p-1 h-100"
            text={<img style={{ width: "28px" }} alt={type.label} title={`${type.label} View (Change)`} src={type.icon} />}
            onClick={() => setOpen(true)}
        />
    };

    const renderOptions = () =>
    <div className="p-3">
    {
        modesList.map(i =>
            <OptionButton
               text={
                   <div className="d-flex w-100 align-items-center">
                       <div style={{ width: '36px' }}>
                           <img alt={i.label} className="w-100" src={i.icon} />
                       </div>
                       <div className="ml-2" style={{ width: 'auto' }}>
                        {i.label}
                       </div>
                   </div>
               }
               onClick={() => handleChange(i.value)}
               isSelected={i.value === value}
               disabled={i.value === value}
            />
        )
    }
    </div>;

    return <div>
        {renderCurrentType()}
        {
            isOpen &&
            <BottomPopup
                appElement=".app"
                isOpen={isOpen}
                title="Change View Mode"
                onClose={() => setOpen(false)}
                children={renderOptions()}
                maxWidth="400px"
            />
        }

    </div>

}