import React, {useState} from "react";
import styled from '@emotion/styled';

import { AuthCard } from "../../../auth";
import { Button } from "../../../ui";
 import AboutSection from './about';


import { keyframes } from 'emotion'

const gradient = keyframes`
      0% { background-position: 0 50%; } 
      50% { background-position: 0 100%; } 
      100% { background-position: 0 50%; } 
`;


const CoverWrapper = styled.div`
  padding: 8vh 2vw;
  min-height: 50vw;
  color: white;
  background: linear-gradient(-45deg,#0CC1B0,#0AA5C3);
  background-size: 400% 400%;
  animation: ${props => `${gradient} 10s ease infinite`};
  h1 {
    font-size: calc(1.35rem + 3vw);
    line-height: 1.2;
  }
`;

const SubHeading = styled.div`
  color: white;
  font-size: calc(1rem + 0.8vw);
  .highlight {
    display: inline-block;
    font-weight: bold;
  }
`;

export default ({}) => {

    const [loginModal, showLoginModal] = useState(false);

    return <CoverWrapper as="section">
        <div className="row m-0 h-100">
            <div className="col-lg-8 col-md-6 p-3 d-flex align-items-center h-100">
                <div>
                    <div>
                        <h1>A Friendlier Way to <span className="d-lg-inline-block">Discover & Share Lists.</span></h1>
                        <SubHeading>The only social network that is <span className="highlight">to the point</span>.</SubHeading>
                    </div>
                    <div className="d-lg-block d-none my-3">
                        <AboutSection />
                    </div>
                </div>
            </div>
            <div className="col-lg-4 col-md-6 d-flex h-100 align-items-center p-lg-2 p-0 text-dark">
                <div className="d-none d-md-flex w-100">
                    <AuthCard
                        isSignup
                        variant="card"
                        startFocused={false}
                        requireInvite
                        onComplete={() => console.log()}
                    />
                </div>
                <div className="d-block d-md-none text-center mt-4 w-100">
                    <Button
                        text="Join Now"
                        className="orange-button rounded p-3 px-5 shadow-lg"
                        onClick={() => showLoginModal(true)}
                    />
                    { loginModal ?
                        <AuthCard
                            isSignup
                            onComplete={() => showLoginModal(false)}
                            onClose={() => showLoginModal(false)}
                            variant="modal"
                            startFocused={false}
                            requireInvite
                        /> : null
                    }
                </div>
            </div>
        </div>
    </CoverWrapper>
}