import React from "react";
import styled from '@emotion/styled'

import { EntrySubmitCard, EntryFeatureSwitchCard, EntryReviewCard } from "../../../entry";
import { Stats } from '../vote';

const SidebarContainer = styled.div`
    position: sticky;
    top: 10vh;
`;

export default ({ data, className }) => {


    return <SidebarContainer className={className}>
    {data.properties.isVotable && <Stats slug={data.slug} />}
    {
        data && data.userCanEdit ?
        <React.Fragment>
            <EntryFeatureSwitchCard
                isEnabled={data.properties && data.properties.acceptEntries}
                slug={data.slug}
            />
            <EntryReviewCard
                hasEntries={data.hasEntries}
                isAccepting={data.properties && data.properties.acceptEntries}
                slug={data.slug}
            />
        </React.Fragment> :
        <React.Fragment>
        {  data.properties ?
            <React.Fragment>
                {data.properties.acceptEntries && <EntrySubmitCard slug={data.slug} />}
            </React.Fragment> : null
        }
        </React.Fragment>
     }
    </SidebarContainer>
}