import React, {useEffect, useState} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

import Toggler from "../../../../components/ui/Toggler";

const ListAdvancedSettingsEditor = ({
    properties = {
        isPrivate: false,
        isRanked: false,
        isVotable: false,
        collaboration: false,
        areVotesPrivate: false,
        canVoteMultipleItems: false,
        acceptEntries: false,
    },
    showTemplateSuggestion = true,
    onChange, onRequestTemplates
}) => {
    const [isPublic, setPublic] = useState(!properties.isPrivate);
    const [isRanked, setRanked] = useState(properties.isRanked);
    const [isVotable, setVotable] = useState(properties.isVotable);
    const [areVotesPrivate, setVotingPrivacy] = useState(properties.areVotesPrivate);
    const [canVoteMultipleItems, setVoteMultiple] = useState(properties.canVoteMultipleItems);
    const [acceptEntries, setAcceptEntries] = useState(properties.acceptEntries);

    const handleChange = () => {
        onChange({
            isPrivate: !isPublic,
            isRanked,
            isVotable,
            areVotesPrivate,
            acceptEntries
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
                                            text="👥 Keep Votes Secret"
                                            onChange={(v) => { setVotingPrivacy(v); setUpdated(true); }}
                                            state={areVotesPrivate}
                                            smalll
                                        />
                                    </div>
                                    <div className="p-2">
                                        <Toggler
                                            text="👥 Multiple Votes"
                                            onChange={(v) => { setVoteMultiple(v); setUpdated(true); }}
                                            state={canVoteMultipleItems}
                                            small
                                        />
                                    </div>
                                </React.Fragment> : null
                        }
                    </div> : null
            }
            <div className="bg-light my-2 p-4">
                <Toggler
                    text={<h6 className="m-0">👯 Accept Entries</h6>}
                    onChange={(v) => { setAcceptEntries(v); setUpdated(true); }}
                    state={acceptEntries}
                />
                {/*{*/}
                {/*    collaboration ?*/}
                {/*        <div className="p-2">*/}
                {/*            <Toggler*/}
                {/*                text="💁‍♀️Public Entries"*/}
                {/*                onChange={(v) => { setPublicEntries(v); setUpdated(true); }}*/}
                {/*                state={publicEntries}*/}
                {/*                small*/}
                {/*            />*/}
                {/*        </div> : null*/}
                {/*}*/}
            </div>
        </div>
    </div>;

};

export default ListAdvancedSettingsEditor;