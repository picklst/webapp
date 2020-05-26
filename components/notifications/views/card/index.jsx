import React from "react";
import styled from '@emotion/styled';

import {UserBadge} from "../../../profile";
import {Card} from "../../../ui";

const ActorLessAvatar = styled.div`
    background-color: #E0E0E0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100vw;
    width: 2.5rem;
    height: 2.5rem;
    color: #0091EA;
    border: 1.5px solid;
    i {
      --ggs: 1.2
    }
`;

const ActorLessText = styled.div`
  display: flex;
  padding-left: 0.5rem;
  align-items: center;
  width: auto;
  font-size: 0.9rem;
  line-height: 1.3;
`;


export default ({ actor, action, resource, timestamp }) => {

    const renderActorLessCard = () =>
    <div className="d-flex">
        <div style={{ width: '3.2rem' }} className="d-flex align-items-center justify-content-center">
            <ActorLessAvatar>
                <i className="gg-inbox" />
            </ActorLessAvatar>
        </div>
        <ActorLessText>{action.phrase}</ActorLessText>
    </div>;

    return <Card p={3} className="mb-1">
        <div>
            {   actor ?
                <UserBadge
                    {...actor}
                    suffixText={` ${action && action.phrase}`}
                    timestamp={timestamp}
                /> : renderActorLessCard()

            }
            {
                resource &&
                <div className="p-2">
                    {resource.title}
                </div>
            }
        </div>
    </Card>
}