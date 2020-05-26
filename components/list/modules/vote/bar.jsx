import React, {useState} from "react";
import styled from '@emotion/styled'
import { toast } from 'react-toastify';

import { LogListVote, UnlogListVote, useListVoteState } from "../../../../states";
import { APIRequest } from "../../../../utils";

import { Button } from "../../../ui";
import {AuthCard} from "../../../auth";
import {useGlobalState} from "../../../../actions/states/Auth.ts";

const VoteBarWrapper = styled.div`
  padding: 0.5rem;
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  background: #FAFAFA;
`;

export default ({ slug, itemID }) => {
    const [data] = useGlobalState('UserInfo');
    const isLoggedIn = !!data;
    const [votes] = useListVoteState('votes');

    const [authCard, showAuthCard] = useState(false);

    const isListVoted = () => {
        return votes && votes.hasOwnProperty(slug);
    };

    const isVoted = () => {
        return votes && votes.hasOwnProperty(slug) && votes[slug] === itemID;
    };

    const voteItem = async (variables, isUnVoting) => {
        const voteQuery = `
        mutation list_vote($slug: String!, $itemID: String!)
        {
          listVote(list: { slug: $slug}, itemID: $itemID)
        }`;
        const unvoteQuery = `
        mutation list_unvote($slug: String!, $itemID: String!)
        {
          listUnvote(list: { slug: $slug}, itemID: $itemID)
        }`;
        return await APIRequest({
            query: isUnVoting ? unvoteQuery : voteQuery,
            variables,
            requireAuth: true
        }).then((data) => {
            return { success: true, data };
        }).catch((errors) => { return { success: false, errors }});
    };


    const handleVote = () => {
        if(isLoggedIn)
            voteItem({ slug, itemID }, isVoted()).then(({ success, data, errors}) => {
                if(success) {
                    if(!isVoted())
                        LogListVote(slug, itemID);
                    else UnlogListVote(slug);
                    toast.success(
                        `Your vote has been ${isVoted() ? 'removed' : 'submitted'}.`,
                        {
                            autoClose: 1000,
                            hideProgressBar: true,
                            closeButton: false,
                            position: toast.POSITION.BOTTOM_CENTER,
                        }
                    );
                } else {
                    toast.error(
                        `Your vote could not be submitted due to an unknown error. Please try again.`,
                        {
                            autoClose: 1000,
                            hideProgressBar: true,
                            closeButton: false,
                            position: toast.POSITION.BOTTOM_CENTER,
                        }
                    );
                }
            });
        else showAuthCard(true);
    };

    const renderVoteButton =
    <Button
        brandAccent
        text="Vote"
        className="small"
        onClick={handleVote}
    />;

    const renderVoted =
    <div className="d-flex align-items-center">
        <div className="d-flex align-items-center text-success">
            <i className="gg-check-o" />
            <div className="pl-2">Voted</div>
        </div>
        <Button
            className="d-inline ml-1 p-1 small plain-button"
            text="(Unvote)"
            onClick={handleVote}
        />
    </div>;

    return <VoteBarWrapper>
    {  isVoted() ? renderVoted : renderVoteButton }
    {
        !isLoggedIn && authCard &&
        <AuthCard
            variant="bottom-popup"
            labels={{ title: "Login Required" }}
            onClose={() => showAuthCard(false)}
        />
    }
    </VoteBarWrapper>
}