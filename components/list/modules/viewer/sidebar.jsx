import React from "react";
import styled from '@emotion/styled'

import { EntrySubmitCard, EntryFeatureSwitchCard, EntryReviewCard } from "../../../entry";
import { Stats } from '../vote';

const SidebarContainer = styled.div`
    padding: 1rem 0.25rem;
    position: sticky;
    top: 10vh;
`;

export default ({ data, className, isMobile }) => {


    return <SidebarContainer className={className}>
    {data.properties.isVotable && <Stats isMobile={isMobile} slug={data.slug} />}
    {
        data && data.userCanEdit ?
        <React.Fragment>
            <EntryFeatureSwitchCard
                isEnabled={data.properties && data.properties.acceptEntries}
                slug={data.slug}
                isMobile={isMobile}
            />
            <EntryReviewCard
                hasEntries={data.hasEntries}
                isAccepting={data.properties && data.properties.acceptEntries}
                slug={data.slug}
                isMobile={isMobile}
            />
        </React.Fragment> :
        <React.Fragment>
        {  data.properties ?
            <React.Fragment>
                {
                    data.properties.acceptEntries &&
                    <EntrySubmitCard slug={data.slug} isMobile={isMobile} />
                }
            </React.Fragment> : null
        }
        </React.Fragment>
     }
    </SidebarContainer>
}