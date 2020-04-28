import React from 'react';
import styled from 'styled-components';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

import {useGlobalState} from "../../../../actions/states/Auth.ts";

import Card from "../../../ui/Cards";
import Toggler from "../../../ui/Toggler";
import DropDown from "../../../ui/DropDown";
import AccountBox from "./index";

const AccountDropdownButton = styled.div`
  padding: 0.75rem 1rem;
  color: inherit;
  border-radius: 0.35rem;
  background-color: #ECEFF1;
  &:hover, &:focus {
    background-color: #CFD8DC;
    text-decoration: none;
    color: inherit;
  }
`;

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

    const [UserInfo, setUserInfo] = useGlobalState('UserInfo');

    const renderSettingsDropDown = () =>
    <Card p={0}>
        <AccountBox isVertical />
        <div className="p-1">
            <DropdownOption>
                <Toggler small className="p-0 my-0" text="Dark Mode" />
            </DropdownOption>
            <DropdownOption>
                <a href="/feedback" className="plain-link">
                    <i className="gg-comment" />
                    <div className="pl-2">Give Feedback</div>
                </a>
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
                        <div className="d-flex align-items-center px-2">
                            <i className="gg-log-out" />
                            <div className="pl-2">Logout</div>
                        </div>
                    </DropdownOption> : null
            }
        </div>
        <FooterTextWrap>&copy; Picklst 2020.</FooterTextWrap>
    </Card>;

    const renderButton =
    <AccountDropdownButton title="Account Dropdown">
        <FontAwesomeIcon icon={faCaretDown} size="lg" />
    </AccountDropdownButton>;

    return <DropDown
        triggerComponent={renderButton}
        dropdownComponent={renderSettingsDropDown()}
    />

};