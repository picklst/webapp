import React, {useEffect, useState} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

import Toggler from "../../../../components/ui/Toggler";


const ListAdvancedSettingsEditor = ({
    properties = {
        isPublic: true,
        isRanked: false,
        isVotable: false,
        collaboration: false,
        publicVoting: false,
        publicEntries: false,
    },
    showTemplateSuggestion = true,
    onChange, onRequestTemplates
}) => {
    const [isPublic, setPublic] = useState(properties.isPublic);
    const [isRanked, setRanked] = useState(properties.isRanked);
    const [isVotable, setVotable] = useState(properties.isVotable);
    const [collaboration, setCollaboration] = useState(properties.collaboration);
    const [publicVoting, setPublicVoting] = useState(properties.publicVoting);
    const [publicEntries, setPublicEntries] = useState(properties.publicEntries);

    const handleChange = () => {
        onChange({
            isPublic,
            isRanked,
            isVotable,
            collaboration,
            publicVoting,
            publicEntries
        })
    };

    const [isUpdated, setUpdated] = useState(false);
    useEffect(() => {
        if(isUpdated) {
            handleChange();
            setUpdated(false);
        }
    });

    return <div className="px-2 pt-2">
        <div className="row mx-0 mb-2">
            <div className="col-6 px-2 d-flex align-items-center">
                <div className="text-primary font-weight-bold">⚙️Properties</div>
            </div>
            <div className="col-6 d-flex justify-content-end">
            {
                showTemplateSuggestion ?
                    <button onClick={onRequestTemplates} className="btn rounded-pill btn-outline-info d-flex align-items-center small font-weight-bold">
                        <div className="small pr-1">🎨 Use Templates</div>
                        <FontAwesomeIcon icon={faChevronRight} size="xs" />
                    </button> : null
            }
            </div>
        </div>
        <div>
            <div className="bg-light my-2 p-4">
                <Toggler
                    text={<h6 className="m-0">🌏 Public</h6>}
                    onChange={(v) => { setPublic(v); setUpdated(true); }}
                    state={isPublic}
                />
            </div>
            <div className="bg-light my-2 p-4">
                <Toggler
                    text={<h6 className="m-0">🥇 Ranked Listing</h6>}
                    onChange={(v) => { setRanked(v); setUpdated(true); }}
                    state={isRanked}
                />
            </div>
            {
                isRanked ?
                    <div className="bg-light my-2 p-4">
                        <Toggler
                            text={<h6 className="m-0">👍👎 Voting</h6>}
                            onChange={(v) => { setVotable(v); setUpdated(true); }}
                            state={isVotable}
                        />
                        {
                            isVotable ?
                                <React.Fragment>
                                    <div className="p-2">
                                        <Toggler
                                            text="👥 Public Voting"
                                            onChange={(v) => { setPublicVoting(v); setUpdated(true); }}
                                            state={publicVoting}
                                            smalll
                                        />
                                    </div>
                                    <div className="p-2">
                                        <Toggler
                                            text="👥 Multiple Votes"
                                            onChange={(v) => { setPublicVoting(v); setUpdated(true); }}
                                            state={publicVoting}
                                            small
                                        />
                                    </div>
                                </React.Fragment> : null
                        }
                    </div> : null
            }
            <div className="bg-light my-2 p-4">
                <Toggler
                    text={<h6 className="m-0">👯 Collaboration</h6>}
                    onChange={(v) => { setCollaboration(v); setUpdated(true); }}
                    state={collaboration}
                />
                {
                    collaboration ?
                        <div className="p-2">
                            <Toggler
                                text="💁‍♀️Public Entries"
                                onChange={(v) => { setPublicEntries(v); setUpdated(true); }}
                                state={publicEntries}
                                small
                            />
                        </div> : null
                }
            </div>
        </div>
    </div>;

};

export default ListAdvancedSettingsEditor;