import React, {useState} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faCheckCircle } from "@fortawesome/free-solid-svg-icons";


import SwipeList from "../../../../components/ui/SwipeList";

const types = require("../../../../data/list_types.json");


const ListTemplatePicker = ({ onSelect, onRequestAdvanced }) => {
    const [typeSelected, setTypeSelected] = useState(-1);

    const handleSelection = (index) => {
        setTypeSelected(index);
        const sel = types[index];
        onSelect({
            isPublic:!sel.private,
            isRanked: sel.ranked,
            isVotable: sel.votable,
            collaboration: sel.collaboration,
            publicEntries: sel.publicEntries,
            publicVoting: sel.publicVoting
        });
    };

    return <div className="p-3">
        {
            typeSelected === -1 ?
                <p className="mb-2 small">What type of list, do you want to make?</p>
            : <div className="font-weight-bold text-primary mb-2">
                List Template
            </div>
        }
        <SwipeList
            minWidth={200}
            items={
                types.map((t,index) =>
                    <button
                        style={{backgroundImage: `url(${require("../../../../images/assets/thumbnails/"+t.thumbnail)})`,}}
                        className="list-type-selection-card w-100 btn plain-button"
                        onClick={() => handleSelection(index)}
                    >
                        <div className="list-type-info text-left">
                            {t.name}
                        </div>
                        {
                            index === typeSelected?
                                <div className="selected">
                                    <FontAwesomeIcon icon={faCheckCircle} size="lg" />
                                </div> : null
                        }
                    </button>
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