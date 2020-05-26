import React, {useState} from "react";
import styled from "@emotion/styled";
import { toast } from 'react-toastify';

import {Button, TextInput} from "../../../ui";
import {APIRequest} from "../../../../utils";
import {useAuthState} from "../../../../states";

const OnboardingCardTitle = styled.div`
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: -0.25px;
    color: #555;
    font-size: 1rem;
    margin-top: 1rem;
`;

export default ({ onProceed }) => {
    const [myUserData, setUserInfo] = useAuthState('userInfo');

    const [firstName, setFirstName] = useState(myUserData && myUserData.firstName ? myUserData.firstName : '');
    const [lastName, setLastName] = useState(myUserData && myUserData.lastName ? myUserData.lastName : '');

    const [isSaving, setSaving] = useState(false);

    const updateProfile = async (variables) => {
        const query = `
        mutation update_account($profile: UserUpdationInput!)
        {
          accountUpdate(input: $profile)
          {
             returning { username }
          }
        }`;
        return await APIRequest({ query, variables, requireAuth: true}).then((data) => {
            return { success: true, data }
        }).catch((errors) => {
            return { success: false, errors}
        })
    };

    const handleSave = () => {
        setSaving(true);
        updateProfile({profile: { firstName, lastName, username: myUserData.username }}).then(({ success, data, errors}) => {
            setSaving(false);
            if(success)
            {
                toast.success(
                    "Saved successfully",
                    {
                        autoClose: 1000, hideProgressBar: true, closeButton: false,
                        position: toast.POSITION.BOTTOM_CENTER,
                    }
                );
                onProceed();
            } else {
                toast.error(
                    "Could not save due to an unknown error. Please try again.",
                    {
                        autoClose: 1000, hideProgressBar: true, closeButton: false,
                        position: toast.POSITION.BOTTOM_CENTER,
                    }
                );
            }
        });
    };

    return <div className="p-3 mb-1">
        {
            isSaving ?
            <div className="d-flex align-items-center justify-content-center py-5 my-5">
                <div className="p-2">
                    <div className="d-flex justify-content-center mb-2 align-items-center">
                        <i className="gg-spinner" />
                    </div>
                    <h6>Saving</h6>
                </div>
            </div> :
            <React.Fragment>
                <OnboardingCardTitle className="text-center">What's your Name?</OnboardingCardTitle>
                <div className="my-2">
                    <TextInput alwaysShowLabel value={firstName} onChange={setFirstName} label="First Name" name="first_name" minimal />
                    <TextInput alwaysShowLabel value={lastName} onChange={setLastName} label="Last Name" name="last_name" minimal />
                </div>
                <Button
                    brandAccent
                    text="Save & Continue"
                    className="my-2 mx-0 w-100"
                    onClick={handleSave}
                />
                <Button
                    text="Skip & Proceed"
                    className="w-100 mx-0"
                    onClick={onProceed}
                />
            </React.Fragment>
        }
    </div>;
}