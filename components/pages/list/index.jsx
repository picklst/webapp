import React, {useState} from "react";
import styled from '@emotion/styled';

import {Header, ShareCard, Topbar} from "../../commons";
import {ListViewer} from "../../list";
import Base from "../../core/Base";

import { RelatedLists } from '../../discovery';
import {usePreferenceState} from "../../../states";
import {BottomPopup, Button} from "../../ui";

const SidebarContainer = styled.div`
    padding: 0.5rem;
    position: sticky;
    top: 10vh;
`;

const TopbarIconsWrapper = styled.div`
  margin-right: 0.5rem;
  padding: 0.5rem 0;
  i {
    --ggs: 1.3
  }
`;

export default ({ title, description, name, slug, username, isEditing }) => {

    const [hideDistractions, setHideDistractions] = usePreferenceState('hideDistractions');

    const [showShareCard, setShowShareCard] = useState(false);

    const getShareTitle = () => `Checkout this list, ${name} by ${username} on Picklst - `;

    const renderSidebar =
    <SidebarContainer>
        <RelatedLists slug={slug} />
    </SidebarContainer>;

    const renderTopbarButtons =
    <TopbarIconsWrapper className="mr-3">
        <Button
            text={<i className="gg-share" />}
            className="plain-button"
            onClick={() => setShowShareCard(true)}
        />
    </TopbarIconsWrapper>;

    return <Base meta={{ title, description }}>
        <Header />
        <Topbar showLogoLeft button={renderTopbarButtons} />
        <div>
            <div className="container p-0">
                <div className="row mx-0 mb-4">
                    {!hideDistractions &&
                        <div className="col-md-3 px-0 my-2 p-md-0 order-md-1 order-2">
                            {renderSidebar}
                        </div>
                    }
                    <div className="col-md-9 p-0 p-md-2 order-md-2 order-1">
                        <ListViewer
                            isEditing={isEditing}
                            username={username}
                            slug={slug}
                        />
                    </div>
                    {
                        showShareCard &&
                        <BottomPopup
                            isOpen={showShareCard}
                            title="Share this list"
                            children={
                                <div className="p-2 my-2">
                                    <ShareCard
                                        title={getShareTitle()}
                                        url={`https://picklst.com/${username}/${slug}`}
                                    />
                                </div>
                            }
                            onClose={() => setShowShareCard(false)}
                        />
                    }
                </div>
            </div>
        </div>
    </Base>

}