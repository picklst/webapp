import React from "react";
import styled from '@emotion/styled';

import {Card} from "../../../ui";
import {UserBadge} from "../../../profile";
import {ListCard} from "../../../list";

const UpdateCard = styled(Card)`
  background-color: #FAFAFA!important;
  border-radius: 0.5rem;
`;


export default ({ story }) => {

    return <UpdateCard hasShadow={false} p={0}>
        <div className="px-2 py-3 mx-2 mt-3">
            <UserBadge
                {...story.user}
                timestamp={story.timestamp}
                suffixText=" created a new list"
            />
        </div>
        <div className="px-2 pb-4">
            <ListCard
                {...story.list}
                itemCount={story.list.itemCount}
                curator={story.user}
                timestampCreated={story.timestamp}
                hideTopbar
                hideUsername
            />
        </div>
    </UpdateCard>

}