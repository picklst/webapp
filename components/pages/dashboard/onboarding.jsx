import React, {useState} from "react";
import styled from '@emotion/styled';
import shortid from "shortid";


import {useGlobalState} from "../../../actions/states/Auth.ts";
import {Button, PopUp, TextInput} from "../../ui";
import {useRouter} from "next/router";

const whyPickList = require('../data/why_picklst');

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

const OnboardingCardTitle = styled.div`
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: -0.25px;
    color: #555;
    font-size: 1rem;
    margin-top: 1rem;
`;

const OnboardingCardText = styled.p`
  margin-top: 0.5rem;
  margin-bottom: 1.5rem;
  font-size: 0.8rem;
  color: #666;
  padding: 0 0.5rem;
  line-height: 1.15;
`;

const WelcomeTitle = styled.h2`
    font-weight: 800;
    line-height: 1;
    text-transform: uppercase;
    padding: 0.5rem;
`;

const TaglineText = styled.h6`
    padding: 0 0.5rem;
    line-height: 1;
    color: #6200EA;
    margin-bottom: 1rem;
`;

const FeatureText = styled.p`
  font-size: 0.8rem;
  color: #666;
  padding: 0 0.5rem;
  line-height: 1.15;
  margin-bottom: 0;
  display: flex;
  align-items: center;
`;

export default ({ }) => {
    const router = useRouter();

    const [data, setData] = useGlobalState('UserInfo');
    const [showWelcomePopup, setShowWelcomePopup] = useState(true);

    const [onBoardingStage, setOnBoardingStage] = useState(1);

    const renderFeatureIntro = () =>
    <div className="p-2 mb-1">
        <WelcomeTitle>Introducing Picklst.</WelcomeTitle>
        <TaglineText>A Friendlier way to <div className="d-inline-block font-weight-bold">Discover & Share Lists.</div></TaglineText>
        { whyPickList.map(i =>
            <div key={shortid.generate()} className="d-flex p-1 mx-0 mb-2">
                <div className="d-flex justify-content-center align-items-center" style={{ minWidth: '45px' }}>
                    {   i.icon ?
                        <img
                            style={{ height: '45px' }}
                            src={require('../../../images/assets/illustrations/'+i.icon)}
                            alt="icon"
                        /> : null
                    }
                </div>
                <FeatureText>{i.title}</FeatureText>
            </div>
        )}
        <Button
            brandAccent
            text="Next"
            className="my-2 mx-0 w-100"
            onClick={() => setOnBoardingStage(2)}
        />
    </div>;

    const renderBasicProfileForm = () =>
    <div className="p-3 mb-1">
        <OnboardingCardTitle className="text-center">What's your Name?</OnboardingCardTitle>
        <div className="my-2">
            <TextInput alwaysShowLabel label="First Name" name="first_name" minimal />
            <TextInput alwaysShowLabel label="Last Name" name="last_name" minimal />
        </div>
        <Button
            brandAccent
            text="Save & Continue"
            className="my-2 mx-0 w-100"
            onClick={() => setOnBoardingStage(3)}
        />
        <Button
            text="Skip & Proceed"
            className="w-100 mx-0"
            onClick={() => setOnBoardingStage(3)}
        />
    </div>;

    const renderGetStarted = () =>
    <div className="p-2 mb-1 text-center">
        <img
            alt="logo"
            src={require('../../../images/assets/branding/logo-dark.png')}
            style={{ maxWidth: "120px" }}
        />
        <OnboardingCardTitle>Welcome to Picklst</OnboardingCardTitle>
        <OnboardingCardText>
            Picklst let's you discover, create & share lists with your friends.
        </OnboardingCardText>
        <div className="p-2">
            <Button
                brandAccent
                text="Make a List"
                className="mb-2 mx-0 w-100"
                onClick={() => { router.push(`/new`) }}
            />
            <Button
                text="View Your Profile"
                className="w-100 mx-0"
                onClick={() => { router.push(`/${data.username}`) }}
            />
        </div>
    </div>;


    const renderWelcomePopup = () => showWelcomePopup &&
    <StyledPopup isOpen onClose={() => setShowWelcomePopup(false)} showTopbar>
        { onBoardingStage === 1 && renderFeatureIntro() }
        { onBoardingStage === 2 && renderBasicProfileForm() }
        { onBoardingStage === 3 && renderGetStarted() }
    </StyledPopup>;

    return <div>
        {renderWelcomePopup()}
        { data && !data.firstName ? renderProfileIncomplete : null  }
    </div>
};