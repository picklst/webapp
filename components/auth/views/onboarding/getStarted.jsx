import React from "react";
import {useRouter} from "next/router";

import {Button} from "../../../ui";
import styled from "@emotion/styled";
import {useAuthState} from "../../../../states";


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

export default ({ }) => {

    const router = useRouter();

    const [data, setUserdata] = useAuthState('userInfo');

    return <div className="p-2 mb-1 text-center">
        <img
            alt="logo"
            src={require('../../../../images/assets/branding/logo-dark.png')}
            style={{ maxWidth: "120px" }}
        />
        <OnboardingCardTitle>Welcome to Picklst</OnboardingCardTitle>
        <OnboardingCardText>
            Picklst let's you discover, create & share lists with your friends.
        </OnboardingCardText>
        <div className="p-2">
            {/*<Button*/}
            {/*    brandAccent*/}
            {/*    text="Make a List"*/}
            {/*    className="mb-2 mx-0 w-100"*/}
            {/*    onClick={() => { router.push(`/new`) }}*/}
            {/*/>*/}
            <Button
                text="View Your Profile"
                className="w-100 mx-0"
                onClick={() => { router.push(`/${data.username}`) }}
            />
        </div>
    </div>

}