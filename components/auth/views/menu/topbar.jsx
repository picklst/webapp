import React from "react";
import styled from "@emotion/styled";
import {usePreferenceState} from "../../../../states";

const TopbarContainer = styled.div`
  position: sticky;
  top: ${({top}) => top!== null && top > 0 ? `calc(${top}px + 5px)` : 0};
  left: 0;
  width: 100%;
  display: ${({direction}) => direction === 'down' ? 'none' : 'flex'};
  align-items: center;
  background: white;
  padding: 1rem;
  z-index: 500;
  box-shadow: 3px 5px 8px rgba(0,0,0,0.3);
  height: ${({direction}) => direction === 'down' ? 0 : null };
  margin-bottom: 1rem;
`;

const BackButtonWrapper = styled.button`
  width: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  i {
    --ggs: 1.3
  }
`;

const TitleWrapper = styled.div`
  font-weight: 600;
  font-size: 1.2rem;
`;

export default ({ title, onClickBack }) => {

    const [space, setSpacing] = usePreferenceState('topbarHeight');

    return <TopbarContainer top={space} as="header">
        <div className="d-flex w-100">
            <div style={{ width: "42px" }} className="d-flex align-items-center justify-content-start px-2">
                <BackButtonWrapper className="plain-button" onClick={onClickBack}>
                    <i className="gg-chevron-left" />
                </BackButtonWrapper>
            </div>
            <div style={{ width: "auto" }} className="px-2">
                <TitleWrapper>{title}</TitleWrapper>
            </div>
        </div>
    </TopbarContainer>;
}