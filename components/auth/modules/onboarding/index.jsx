import React, {useState} from "react";
import styled from "@emotion/styled";

import {useAuthState} from "../../../../states";

import {PopUp} from "../../../ui";

import {
    OnboardingFeaturePreview,
    OnboardingProfileCompletion,
    OnboardingGetStarted
} from '../../views';

const StyledPopup = styled(PopUp)`
    height: unset!important;
    background-color: white!important;
    border-radius: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 400px;
    width: 80%!important;
    .popup-topbar {
      border-top-left-radius: 1rem;
      border-top-right-radius: 1rem;
    }
`;



export default () => {
    const [myUserData, setUserInfo] = useAuthState('userInfo');

    const showPopup = () => !(myUserData && myUserData.firstName.length >0);

    const [showWelcomePopup, setShowWelcomePopup] = useState(showPopup());
    const [onBoardingStage, setOnBoardingStage] = useState(1);

    const renderWelcomePopup = () => showWelcomePopup &&
    <StyledPopup isOpen onClose={() => setShowWelcomePopup(false)} showTopbar>
        { onBoardingStage === 1 &&
            <OnboardingFeaturePreview onProceed={() => setOnBoardingStage(2)} />
        }
        { onBoardingStage === 2 &&
            <OnboardingProfileCompletion onProceed={() => setOnBoardingStage(3)} />
        }
        { onBoardingStage === 3 &&
            <OnboardingGetStarted />
        }
    </StyledPopup>;

    return <div>
        {renderWelcomePopup()}
    </div>;

}