import {Card} from "../../../ui";
import React from "react";
import styled from "@emotion/styled";
import { toast } from 'react-toastify';

import AccountBox from "../../../commons/header/account";
import { useAuthState, useOverlayState } from "../../../../states";
import { TokenDelete } from "../../../../utils/authMutations.ts";

const DropdownOption = styled.div`
  padding: 1rem 0.5rem;
  &:hover, &:focus {
    background-color: #CFD8DC;
    border-radius: 0.5rem;
  }
  a {
    display: flex;
    align-items: center;
  }
`;

const FooterTextWrap = styled.div`
  font-size: 0.75rem;
  padding: 0.5rem;
`;

export default ({ }) => {
    const [UserInfo, setUserInfo] = useAuthState('userInfo');
    const [feedbackWindow, showFeedbackWindow] = useOverlayState('showFeedbackForm');

    const handleLogout = async () => {
        await TokenDelete({}).then(() => {
            toast.success(
                "Logged you out. See you soon 👋",
                {
                    autoClose: 1000, hideProgressBar: true, closeButton: false,
                    position: toast.POSITION.BOTTOM_CENTER,
                }
            );
        })
    };

    return <Card p={0}>
        <AccountBox isVertical />
        <div className="p-1">
            {/*<DropdownOption>*/}
            {/*    <Toggler small className="p-0 my-0" text="Dark Mode" />*/}
            {/*</DropdownOption>*/}
            <DropdownOption>
                <button onClick={() => showFeedbackWindow(true)} className="plain-button d-flex align-items-center">
                    <i className="gg-comment" />
                    <div className="pl-2">Give Feedback </div>
                </button>
            </DropdownOption>
            <DropdownOption >
                <a href="/settings" className="plain-link">
                    <i className="gg-options" />
                    <div className="pl-2">Settings & Privacy</div>
                </a>
            </DropdownOption>
            <DropdownOption>
                <a href="/help" className="plain-link">
                    <i className="gg-support" />
                    <div className="pl-2">Help & Support</div>
                </a>
            </DropdownOption>
            {
                UserInfo && UserInfo.username ?
                    <DropdownOption>
                        <button onClick={handleLogout} className="plain-button d-flex w-100 align-items-center px-2">
                            <i className="gg-log-out" />
                            <div className="pl-3">Logout</div>
                        </button>
                    </DropdownOption> : null
            }
        </div>
        <FooterTextWrap>&copy; Picklst 2020.</FooterTextWrap>
    </Card>;
}