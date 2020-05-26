import React from "react";
import styled from '@emotion/styled';

import {Card} from "../../../ui";
import {UserBadge} from "../../../profile";
import {ItemCard} from "../../../item";

const UpdateCard = styled(Card)`
  background-color: #FAFAFA!important;
  border-radius: 0.5rem;
`;

const ListContainerCard = styled(Card)`
  a {
    font-weight: 600;
    text-decoration: none!important;
  }
`;

const ListTitleWrap = styled.div`
  padding: 1rem;
  font-size: 0.9rem;
`;

export default ({ story }) => {

    return <UpdateCard hasShadow={false} p={0}>
        <div className="px-2 py-3 m-2 mt-3">
                <UserBadge
                    {...story.user}
                    timestamp={story.timestamp}
                    suffixText=" contributed an item"
                />
        </div>
        <div className="px-2 pb-4">
            <ListContainerCard p={0} className="rounded">
                <ListTitleWrap>
                    <a href={`/${story.list.curator.username}`}>
                        @{story.list.curator.username}
                    </a>
                    <span className="px-1">/</span>
                    <a href={`/${story.list.previewURL}/`}>
                        {story.list.name}
                    </a>
                </ListTitleWrap>
                <ItemCard
                    {...story.item}
                    hideOptionMenu
                />
            </ListContainerCard>
        </div>
    </UpdateCard>

}