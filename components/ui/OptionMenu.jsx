import React, {useState} from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import styled from '@emotion/styled'

import BottomPopup from "./BottomPopup";
import {clearAllBodyScrollLocks} from "body-scroll-lock";

const ActionOption = styled.button`
    padding: 1rem;
    text-align: center;
    background: none!important;
    display: block;
    border: none;
    border-bottom: 1px solid rgba(0,0,0,0.2);
    width: 100%;
    &:hover, &:focus {
      outline: none;
      background-color: #eee!important;
    }
`;

const ActionWrapper = styled.div`
  padding: 1rem;
`;

const OptionMenu = ({
    title, options, onClose,
}) => {
    const [actionSelected, selectAction] = useState(null);

    const handleClick = (e, index) => {
        e.stopPropagation();
        clearAllBodyScrollLocks();
        if(options[index] && typeof options[index].onClick === "function")
            options[index].onClick();
        else
            selectAction(index);
    };

    return <BottomPopup className="bg-white" onClose={onClose}
        title={
            actionSelected !== null && options[actionSelected] && options[actionSelected].label ?
                options[actionSelected].label : title
        }
    >
    {   actionSelected == null ?
            options && options.length > 0 &&
                options.map((o, index) =>
                    <ActionOption key={shortid.generate()} tabIndex={0} onClick={(e) => o.module || o.onClick ? handleClick(e, index) : null }>
                        {o.optionBody}
                    </ActionOption>
                )
        : <ActionWrapper>{ options[actionSelected].module }</ActionWrapper>
    }
    </BottomPopup>

};

OptionMenu.propTypes = {
   options: PropTypes.arrayOf(
       PropTypes.shape({
       optionBody: PropTypes.node,
       label: PropTypes.label,
       module: PropTypes.node
    })
   )
};

export default OptionMenu;