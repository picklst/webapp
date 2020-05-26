import React from "react";

import styled from '@emotion/styled';
import {ShareCard} from "../../../commons";

const TokenLabel = styled.div`
    font-size: calc(1.2rem + 0.5vmax);
    text-transform: uppercase;
    line-height: 1;
`;

const TokenNumber = styled.div`
    font-size: calc(1.3rem + 3.5vmax);
    font-weight: 900;
    line-height: 1;
    margin: 0.5rem 0;
`;

const TokenSubHeading = styled.div`
    font-size: calc(1rem + 0.5vw);
    line-height: 1;
    font-weight: 600;
`;

export default ({ tokenNo, email }) => {

    const renderInviteCode =
    <ShareCard
        url={`https://picklst.com/invite?referrer=${email}`}
        title="Checkout Picklst, and join me using this link -"
        description="Checkout Picklst, a brand new social platform to discover & share lists. Join the beta waitlist along with me using this link -"
    />;

    return  <div className="row m-0">
        <div className="col-md-8 col-xl-7 p-0">
            <div className="row mx-0 mb-4">
                <div className="col-4 col-sm-3 d-md-none d-flex p-0 align-items-center">
                    <img className="w-100" src={require('../../../../images/assets/illustrations/coming-soon.png')} alt="invite mail sent"/>
                </div>
                <div className="col p-2 px-sm-4 d-flex align-items-center">
                    <div>
                        <TokenLabel>Your Token Number</TokenLabel>
                        <TokenNumber>{tokenNo}</TokenNumber>
                        <TokenSubHeading>You will receive your invite code when your token number reaches 0. </TokenSubHeading>
                    </div>
                </div>
            </div>
            <div className="px-2 px-md-4">
                <div className="mb-2">
                    Your token number will automatically start decreasing as we send out personal
                    invites to each of the <b>{tokenNo}</b> enthusiasts, and this may take
                    few days. You can always check the status right here.
                </div>
                <p>
                    Looking for a Shortcut? <b>We will give you an invite code immediately if your friend uses
                    your link</b> to sign up for the beta. Take charge of on-boarding your gang too,
                    so that you can discuss & collaborate with them once you have your account!
                </p>
                <div className="mt-4">
                    {renderInviteCode}
                </div>
            </div>
        </div>
        <div className="col-md-4 col-xl-5 d-none d-md-block">
            <img className="w-100" src={require('../../../../images/assets/illustrations/coming-soon.png')} alt="invite mail sent"/>
        </div>
    </div>

};