import React, {useState} from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import styled from 'styled-components';

import BottomPopup from "./BottomPopup";

const ActionOption = styled.button`
    padding: 1rem;
    text-align: center;
    background: none!important;
    display: block;
    border: none;
    border-bottom: 1px solid rgba(0,0,0,0.3);
    width: 100%;
    &:hover {
      background-color: #eee!important;
    }
    &:focus {
      outline: none;
      background-color: #eef!important;
    }
`;

const ActionWrapper = styled.div`
  padding: 1rem;
`;

const OptionMenu = ({
    title, options, onClose,
}) => {
    const [actionSelected, selectAction] = useState(null);

    const handleClick = (index) => {
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
            options && options.length > 0 ?
                options.map((o, index) =>
                    <ActionOption key={shortid.generate()} tabIndex={0} onClick={() => handleClick(index)}>
                        {o.optionBody}
                    </ActionOption>
                ) : null
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