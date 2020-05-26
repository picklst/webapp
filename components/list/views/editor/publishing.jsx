import React from "react";
import styled from '@emotion/styled';

import {PopUp} from "../../../ui";

const PublishingContainer = styled(PopUp)`
  width: 100vw;
  height: 100vh;
  position: relative;
  background-color: rgba(255,255,255,0.9);
  animation: bg-change 2.5s infinite ease alternate-reverse;
  
  @keyframes bg-change {
    0%{
        background-color: #F0F4C3;
    }
    25%{
        background-color: #DCEDC8;
    }
    50%{
        background-color: #FFECB3;
    }
    75%{
        background-color: #B3E5FC;
    }
  }
  
  h4 {
    margin: 8vh 0;
    text-transform: uppercase;
    font-size: calc(2rem + 2.8vw);
    font-weight: 900;
    max-width: 500px;
    line-height: 1;
  }
`;

const Illustration = styled.img`
  position: absolute;
  left: -20vh;
  bottom: -15vh;
  width: 80vh;
  max-width: 800px;
  filter: drop-shadow(2px 3px 15px rgba(0,0,0,0.3));
`;

export default ({ }) =>
<PublishingContainer
    isOpen
    showTopbarOnMobile={false}
    onClose={() => {  }}
    appElement=".app"
>
    <div className="container-md p-3 overflow-hidden my-4 h-100">
        <Illustration src={require('../../../../images/assets/illustrations/publishing.png')} alt="publishing" />
        <h4>Publishing your List</h4>
    </div>
</PublishingContainer>

