import React, {useState} from "react";
import styled from '@emotion/styled'

import {useInviteState} from "../../../../states";

import TextInput from "../../../forms/TextInput";
import { Button } from "../../../ui";

const InviteFormWrap = styled.div`
  width: 100%;
  text-align: center;
  img {
    height: 200px;
    max-height: 20vh;
    margin-bottom: 3vh;
  }
`;
export default ({ onComplete, showIllustration, onRequestInvite, onRequestStatus }) => {
    const [code, setCode] = useState('');
    const handleSubmit = (e) => {
          e.preventDefault();
          if(typeof onComplete === "function")
            onComplete(code);
    };

    const [email] = useInviteState('email');

    return <InviteFormWrap>
        {
            showIllustration ?
            <img alt="invite-required" src={require('../../../../images/assets/illustrations/invite-code.png')} />
            : null
        }
        <h3>Invite Code Required</h3>
        <p className="mt-2">
            Currently only specially invited enthusiasts with an invite code can create an account.
        </p>
        <form onSubmit={handleSubmit}>
            <TextInput
                isRequired
                label="Invite Code"
                placeholder="Enter Your Invite Code"
                name="invite-code"
                minimal
                hideLabel
                onChange={setCode}
                value={code}
            />
            <Button type="submit" brandAccent text="Proceed with Invite Code" className="w-100 p-3 mt-3" />
            {
                email && email.length ?
                <div className="mt-3 text-center"><a onClick={onRequestStatus} href="/#get-invite">Check status</a> for {email}</div> :
                <div className="mt-3 text-center">
                    Need an Invite? <a onClick={onRequestInvite} href="/#get-invite">Request an Invite</a>
                </div>
            }
        </form>
    </InviteFormWrap>
}