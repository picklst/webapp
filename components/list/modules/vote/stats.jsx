import React, {useEffect, useState} from "react";
import shortid from 'shortid';
import styled from '@emotion/styled'

import {APIRequest} from "../../../../utils";
import {ActionCard, Card} from "../../../ui";
import { useListVoteState } from "../../../../states";
import {useGlobalState} from "../../../../actions/states/Auth.ts";

const VoteStatCard = styled(Card)`
    margin-bottom: 1.5rem!important;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
  div {
    width: 15%;
    justify-content: center;
    display: flex;
  }
  h6 {
    width: auto;
    padding: 0 0.35rem;
    margin-bottom: 0;
  }
`;

const ItemVoteStatContainer = styled.div`
  background: ${props => 
    props.percent ? 
        `linear-gradient(to right, #26C6DA ${props.percent}%, #B2EBF2 ${props.percent}% 100%);` 
    : '#B2EBF2' 
  };
  border-radius: 0.25rem;
  padding: 0.5rem;
  margin: 0.25rem 0;
`;

const ItemVoteStat = ({ rank, name, votes, totalVotes }) =>
<ItemVoteStatContainer percent={(votes/totalVotes)*100} className="row mx-0">
    <div title={name} className="col-9 d-flex align-items-center px-1">
        <span className="font-weight-bold">{rank}.</span>
        <span className="small line-height-1 pl-1">
            { name.length > 20 ? name.substr(0,20) + '...' : name }
        </span>
    </div>
    <div className="col-3 d-flex align-items-center justify-content-center font-weight-bold px-0">
        {(votes/totalVotes)*100}<span className="small">%</span> <span className="small pl-1">({votes})</span>
    </div>
</ItemVoteStatContainer>;

export default ({ slug, }) => {
    const [data, setData] = useState(false);
    const [myVotes] = useListVoteState('votes');
    const [userInfo] = useGlobalState('UserInfo');
    const isLoggedIn = !!userInfo;


    const fetchStats = async (variables) => {
        const query = `
        query get_list_vote_stats($slug: String!){
          list(slug: $slug)
          {
            userVote
            {
              name
            }
            votes
            {
              totalVotes
              rankList
              {
                item
                {
                  name
                }
                votes
              }
            }
          }
        }`;
        return await APIRequest({ query, variables, requireAuth: isLoggedIn }).then((data) => {
            return { success: true, data };
        }).catch((errors) => { return { success: false, errors }});
    };

    const handleFetch = () => {
        fetchStats({ slug }).then(({success, data, errors}) => {
            if(success)
                setData(data.list);
            else {
                console.log(errors);
            }
        })
    };
    useEffect(handleFetch, []);
    useEffect(handleFetch, [myVotes]);

    const renderUserVote = (name) =>
    <div className="row mx-0 mb-4 text-success">
        <div className="col-2 d-flex align-items-center justify-content-center px-0"><i className="gg-check-o" /></div>
        <div className="col-10 d-flex align-items-center line-height-1 px-0">
            <div>
                <div className="small">You voted for</div>
                <div title={name}>{ name.length > 15 ? name.substr(0,15) + '...' : name }</div>
            </div>
        </div>
    </div>;

    const [showStats, setShowStats] = useState(false);

    return data.userVote || showStats ?
    <VoteStatCard p={2}>
        <TitleContainer className="p-2">
            <div><i className="gg-poll" /></div>
            <h6>Public Votes</h6>
        </TitleContainer>
        {
            data ?
            <React.Fragment>
                {   data.userVote ? renderUserVote(data.userVote.name) : null }
                {
                    data.votes && data.votes.rankList.length > 0 ?
                        data.votes.rankList.map((i, index) =>
                            <ItemVoteStat
                                key={shortid.generate()}
                                rank={index+1}
                                name={i.item.name}
                                votes={i.votes}
                                totalVotes={data.votes.totalVotes}
                            />
                        )
                    : <div>No Votes So far</div>
                }
            </React.Fragment>
            : null
        }
    </VoteStatCard> :
    <ActionCard
        cover={require('../../../../images/illustrations/covers/thumbsup.png')}
        labels={{
            title: "Pick Your Choice",
            description: "You can pick & vote for your choice from this list. Your vote shall be anonymous.",
            "buttonText": "Show me the results"
        }}
        icon={<i className="gg-poll" />}
        onOpen={() => setShowStats(true)}
        requireAuth={false}
        button
    />

}