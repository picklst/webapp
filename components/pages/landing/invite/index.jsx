import React, {useEffect, useState} from "react";
import styled from '@emotion/styled';
import Button from "../../../ui/Button";

import { useInviteState, setInviteEmail } from "../../../../states";
import {APIRequest} from "../../../../utils";

import Waitlisted from './waitlisted';
import Invited from './invited';
import Form from './form';


const BetaInviteSlideContainer = styled.section`
  background-color: #B3E5FC;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  padding: 5vh 0;
  p {
    font-size: 1.2rem;
  }
`;

const InviteFormCard = styled.div`
  background-color: #E0F7FA;
  padding: 2rem 1.5rem;
  min-width: 70vw;
  max-width: 1200px;
  border-radius: 1rem;
  box-shadow: 5px 5px 15px rgba(0,0,0,0.2);
  .illus {
    width: 180%;
    max-width: 400px;
    margin-left: 5vw;
  }
`;

export default ({ }) => {
    const [errors, setErrors] = useState(false);
    const [inviteResponse, setResponse] = useState(false);

    const [email] = useInviteState('email');


    const submitInvite = async (variables) => {
        const query = `mutation request_invite($email: String!, $referrer:String){
          inviteRequest(email: $email, referrer: $referrer)
          {
            isWaitlisted
            tokenNo
          }
        }`;
        return await APIRequest({ query, variables, requireAuth: false}).then((data) => {
            return { success: true, data};
        }).catch((e) => {
            return { success: false, errors: e};
        })
    };

    useEffect(() => handleSubmission(email), []);

    const [isRequesting, setRequesting] = useState(false);
    const handleSubmission = (email) => {
        if(email && email.length > 0)
        {
            setRequesting(true);
            submitInvite({ email }).then(({ success, data, errors }) => {
                if(success){
                    setInviteEmail(email);
                    setResponse(data.inviteRequest);
                    setRequesting(false);
                } else setErrors(errors);
            });
        }
    };

    const handleUnlink = () => {
        setInviteEmail('');
    };

    const renderInviteForm = () =>
    <InviteFormCard><Form isRequesting={isRequesting} onSubmission={handleSubmission} /></InviteFormCard>;

    const renderInviteResponse = () =>
    <InviteFormCard>
    {   inviteResponse.isWaitlisted ?
            <Waitlisted email={email} tokenNo={inviteResponse.tokenNo} />
        : <Invited email={email} />
    }
    {
        email && email.length &&
        <div className="text-center p-2">
            Since this device was used to request invite, you will receive
            the <b>status of your invite whenever you come back right here</b>.<br/>
            <button className="plain-button text-danger font-weight-bold" onClick={handleUnlink}>(Unlink {email})</button>
        </div>
    }
    </InviteFormCard>;

    const renderError = () =>
        <InviteFormCard>
            <h2>Some Unknown Error Occurred</h2>
            <p>
                We couldn't process your request, please try again.
                If the issue persists, please report it to bugs@picklst.com for rewards.
            </p>
            <Button text="Try Again" onClick={() => setErrors(false)} className="blue-button" />
        </InviteFormCard>;

    return <React.Fragment>
        <BetaInviteSlideContainer id="get-invite" className="px-md-4">
            {
                errors ? renderError()
                : !inviteResponse || !(email && email.length) ? renderInviteForm()
                : renderInviteResponse()
            }
        </BetaInviteSlideContainer>
    </React.Fragment>

}