import React, {useState} from 'react';
import classNames from 'classnames';
import styled from 'styled-components';

import {useGlobalState} from "../../../../actions/states/Auth.ts";

import { AuthCard } from "../../../auth";
import { UserBadge } from "../../../profile";

const AccountAuthButton = styled.button`
    text-transform: uppercase;
    font-size: 0.8rem;
    font-weight: bold;
    border: 1.5px solid;
    margin-bottom: ${props => props.isVertical ? `0.5rem` : 0};
    margin-right:  ${props => !props.isVertical ? `0.5rem` : 0};;
    width:  ${props => !props.isVertical ? 'auto' : '100%'};
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover, &:focus {
      outline: none!important;
    }
`;

const LoginButton = styled(AccountAuthButton)`
    background-color: transparent!important;
    color: #01579B!important;
    transition: 0.3s background-color;
    &:hover, &:focus {
       background-color: #E65100!important;
       color: white!important;
    }
`;

const CreateAccountButton = styled(AccountAuthButton)`
    background-color: #01579B!important;
    color: white!important;
    transition: 0.3s background-color;
    &:hover, &:focus {
        background-color: #E65100!important;
    }
`;

const AccountBox = ({ isVertical = false }) => {

    const [UserInfo, setUserInfo] = useGlobalState('UserInfo');
    const [isLoginCardOpen, toggleLoginCard] = useState(false);


    return !UserInfo ?
    <div className={classNames(isVertical ? "d-block p-2" : "d-flex align-items-center justify-content-center")}>
        <CreateAccountButton isVertical={isVertical} onClick={() => toggleLoginCard('signup')}>Create An Account</CreateAccountButton>
        <LoginButton isVertical={isVertical} onClick={() => toggleLoginCard('login')}>Login</LoginButton>
        { isLoginCardOpen ?
            <AuthCard
                onClose={() => toggleLoginCard(false)}
                variant="modal"
                isSignup={isLoginCardOpen === "signup"}
            /> : null
        }
    </div>
    :  <UserBadge
            showDetailedView={isVertical}
            {...UserInfo}
        />
};

export default AccountBox;