import React, {useEffect, useState} from "react";

import { Editor } from '../';
import { Card } from '../../views';
import {APIRequest} from "../../../../utils";
import {useAuthState} from "../../../../states";

export default ({
    itemID, data, isCreating, isEditing, onComplete, onClose, onDelete
}) => {
    const [totalEntries, setTotalEntries] = useState(0);
    const [results, setResults] = useState(false);
    const [userVote, setUserVote] = useState(false);
    const [myUserInfo] = useAuthState('userInfo');

    const [showResults, setShowResults] = useState(false);
    const [isSubmitting, setSubmitting] = useState(false);

    const getUserVoted = (optionID) => {
        if(optionID && !data.hasAnswer)
        {
            getPollResults();
            setUserVote(data.options.filter(i => i['id'] === optionID)[0]);
        }
    };

    useEffect(() => getUserVoted(data && data.userVotedOption), []);

    const submitEntry = async (variables) => {
        const query = `
        mutation submit_pollEntry($itemID: String!, $optionID: String!){
          itemPollSubmit(itemID: $itemID,optionID: $optionID)
        }`;
        return await APIRequest({ query, variables, requireAuth: true }).then((data) => {
            return { success: true, data }
        }).catch((errors) => { return { success: false, errors }});
    };

    const submitAnswer = async (variables) => {
        const query = `
        mutation vote_item($itemID: String!, $optionID: String!){
            itemAnswerSubmit(itemID: $itemID, optionID: $optionID)
            {
                isCorrect
                correctOption
                {
                    name
                }
            }
        }`;
        return await APIRequest({ query, variables, requireAuth: true }).then((data) => {
            return { success: true, data }
        }).catch((errors) => { return { success: false, errors }});
    };

    const fetchResults = async (variables) => {
        const query = `query poll_results($itemID: String!)
        {
          itemPoll(itemID: $itemID)
          {
            totalEntries
            options
            {
              id
              votes
            }
          }
        }`;
        return await APIRequest({ query, variables, requireAuth: false }).then((data) => {
            return { success: true, data }
        }).catch((errors) => { return { success: false, errors }});
    };

    const getPollResults = () => {
        fetchResults({ itemID }).then(({ success, data, errors}) => {
            if(success) {
                setResults(data.itemPoll.options);
                setTotalEntries(data.itemPoll.totalEntries);
                setShowResults(true);
            }
        })
    };

    const handleSelect = (optionID) => {
        setSubmitting(true);
        if(!data.hasAnswer)
        {
            if(myUserInfo && myUserInfo.username !== null)
            {
                submitEntry({ itemID, optionID }).then(({ success, data, errors}) => {
                    if(success) {
                        getUserVoted(optionID);
                        getPollResults();
                        setSubmitting(false);
                    }
                });
            }
        }
        else
            submitAnswer({ itemID, optionID }).then(({ success, data, errors}) => {
                if(success) {
                    setResults(data.itemAnswerSubmit);
                    setSubmitting(false);
                }
            });

    };

    return isEditing ?
    <Editor
        data={data}
        onDelete={onDelete}
        isCreating={isCreating}
        onClose={onClose}
        onComplete={onComplete}
    /> :
    <Card
        isSubmitting={isSubmitting}
        userVote={userVote}
        options={data.options}
        hasAnswer={data.hasAnswer}
        totalEntries={totalEntries}
        results={results}
        showResults={showResults&&(!!results||(!data.hasAnswer && userVote))}
        onShowResults={getPollResults}
        onHideResults={() => setShowResults(false)}
        onSelect={handleSelect}
    />
}