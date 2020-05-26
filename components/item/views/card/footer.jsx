import React from 'react';
import styled from '@emotion/styled';

import Button from "../../../ui/Button";

import { VoteButtons } from "../../modules";

const Container = styled.div`
  background-color: #F5F5F5;
  display: flex;
  padding: 0.5rem
`;

const ActionsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: left;
`;

const ActionButton = styled(Button)`
    padding: 0.25rem 0.5rem;
    height: 100%;
`;

const ActionWrap = styled.div`
  font-weight: 300;
  color: #333;

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.15rem;
  height: 100%;
  min-width: 28px;
  min-height: 28px;
  i {
    font-size: calc(0.8rem + 1vw);
    display: inline-block;
  }
  span
  { padding-left: 0.5rem; }
`;

export default ({ id, votes }) => {

    return <Container className="rounded-bottom">
        <div>
            {(votes.upVotes.count > 0 || votes.downVotes.count > 0) &&
                <div className="small ml-2 mb-2">
                    {votes.upVotes.count > 0 && `${votes.upVotes.count} Upvote${votes.upVotes.count > 1 ? 's' : ''}`}
                    {votes.upVotes.count > 0 && votes.downVotes.count > 0 && `•`}
                    {votes.downVotes.count > 0 && ` ${votes.downVotes.count} Downvote${votes.upVotes.count > 1 ? 's' : ''}`}
                </div>
            }
            <ActionsContainer>
                <VoteButtons value={votes.userVote} id={id} />
                {/*<ActionButton text={<ActionWrap><i className="gg-comment" /></ActionWrap>}/>*/}
                {/*<ActionButton text={<ActionWrap><i className="gg-play-list-add" /></ActionWrap>}/>*/}
            </ActionsContainer>
        </div>
    </Container>
};