import React, {useState} from 'react';
import styled from '@emotion/styled';

import { SwipeList , Button } from "../../../ui";

const types = require("../../data/list_types");


const TemplateSelectorButton = styled.button`
  padding: 0.5rem;
  min-height: 120px;
  display: list-item;
  background-image: ${props => `url("${props.bg}")` };
  background-size: cover!important;
  position: relative;
  width: 100%;
  border: none!important;
  border-radius: 0.5rem;
  box-shadow: 1px 2px 5px rgba(0,0,0,0.5);
  .list-type-info, .selected, .focused
  {
    border-radius: 0.5rem;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    color: white;
    line-height: 1.1;
    padding: 1rem;
    font-size: calc(0.8rem + 0.3vw);
    height: 100%;
    display: flex;
    font-weight: bold;
    z-index: 1;
  }
   
  .list-type-info
  {
    align-items: flex-end;
    justify-content: start;
    background-color: rgba(0,0,0,0.5);
  }
    
  .selected, .focused{
    align-items: center;
    justify-content: center;
  }
    
  .selected { background: rgba(0,200,0,0.3); }
  .focused { background: rgba(0,0,200,0.3); }
  
`;


const TemplateSelectionCard = ({ data, index, isSelected, onSelect }) => {
    const [isFocused, setFocus] = useState(false);

    return <TemplateSelectorButton
        bg={require("../../../../images/assets/thumbnails/"+data.thumbnail)}
        onClick={() => onSelect(index)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
    >
        <div className="list-type-info text-left">{data.name}</div>
        {   isSelected ?
                <div className="selected"><i className="gg-check-o" /></div>
            : isFocused ? <div className="focused" /> : null
        }
    </TemplateSelectorButton>
};

const ListTemplatePicker = ({ onSelect, onRequestAdvanced }) => {
    const [typeSelected, setTypeSelected] = useState(-1);

    const handleSelection = (index) => {
        setTypeSelected(index);
        const sel = types[index];
        if(typeof onSelect === "function")
            onSelect({
                isPrivate:sel.private,
                isRanked: sel.ranked,
                isVotable: sel.votable,
                acceptEntries: sel.acceptEntries,
                areVotesPrivate: !sel.publicVoting
            });
    };

    return <div className="animated fadeIn p-3">
        <div className="font-weight-bold text-primary small mb-2">
        {  typeSelected === -1 ? "What type of list, do you want to make?" : "List Type" }
        </div>
        <SwipeList
            minWidth={200}
            selectedIndex={typeSelected}
            itemRole="option"
            role="listbox"
            items={types.map((t,index) =>
                <TemplateSelectionCard
                    index={index}
                    data={t}
                    isSelected={index===typeSelected}
                    onSelect={handleSelection}
                />
            )}
        />
        <Button
            onClick={onRequestAdvanced}
            className="d-flex align-items-center small text-info font-weight-bold mt-3"
            text={
                <React.Fragment>
                    <div className="small pr-1">Customize List Properties instead</div>
                    <i className="gg-chevron-double-right" />
                </React.Fragment>
            }
        />
    </div>

};

export default ListTemplatePicker;