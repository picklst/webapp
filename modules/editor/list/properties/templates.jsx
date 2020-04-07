import React, {useState} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faCheckCircle } from "@fortawesome/free-solid-svg-icons";


import SwipeList from "../../../../components/ui/SwipeList";

const types = require("../../../../data/list_types.json");

const TemplateSelectionCard = ({ data, index, isSelected, onSelect }) => {
    const [isFocused, setFocus] = useState(false);

    return <button
        style={{backgroundImage: `url(${require("../../../../images/assets/thumbnails/"+data.thumbnail)})`,}}
        className="list-type-selection-card w-100 btn plain-button"
        onClick={() => onSelect(index)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
    >
        <div className="list-type-info text-left">
            {data.name}
        </div>
        {
            isSelected ?
                <div className="selected">
                    <FontAwesomeIcon icon={faCheckCircle} size="lg" />
                </div> :
            isFocused ? <div className="focused" />: null
        }
    </button>
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

    return <div className="p-3">
        {
            typeSelected === -1 ?
                <p className="mb-2 small">What type of list, do you want to make?</p>
            : <div className="font-weight-bold text-primary mb-2">
                List Type
            </div>
        }
        <SwipeList
            minWidth={200}
            selectedIndex={typeSelected}
            itemRole="option"
            role="listbox"
            items={
                types.map((t,index) =>
                    <TemplateSelectionCard
                        index={index}
                        data={t}
                        isSelected={index===typeSelected}
                        onSelect={handleSelection}
                    />
                )
            }
        />
        <button
            onClick={onRequestAdvanced}
            className="btn rounded-pill btn-outline-info d-flex py-1 px-4 align-items-center small font-weight-bold mt-3"
        >
            <div className="small pr-1">Customize List Properties instead</div>
            <FontAwesomeIcon icon={faChevronRight} size="xs" />
        </button>
    </div>

};

export default ListTemplatePicker;