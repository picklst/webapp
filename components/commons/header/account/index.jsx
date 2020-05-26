import React, {useState} from 'react';
import classNames from 'classnames';
import styled from '@emotion/styled'

import {useGlobalState} from "../../../../actions/states/Auth.ts";

import { AuthCard } from "../../../auth";
import { UserButton } from "../../../profile";
import { Button } from "../../../ui";
import dynamic from "next/dynamic";

const ListEditor =  dynamic(() => import("../../../list").then(mod => mod.ListEditor));

const AccountAuthButton = styled(Button)`
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
    border: 1px solid #E65100!important;
    color: #E65100!important;
    transition: 0.3s background-color;
    &:hover, &:focus {
       background-color: #E65100!important;
       color: white!important;
    }
`;

// @todo doesnt apply in dev
const CreateListButton = styled(Button)`
  color: inherit;
  border-radius: 0.35rem;
  background-color: #ECEFF1;
  height: 100%;
  font-weight: 600;
  &:hover, &:focus {
    background-color: #CFD8DC;
    text-decoration: none;
    color: inherit;
  }
`;


const AccountBox = ({ isVertical = false }) => {

    const [UserInfo] = useGlobalState('UserInfo');
    const [isLoginCardOpen, toggleLoginCard] = useState(false);
    const [showCreator, setShowCreator] = useState(false);

    return !UserInfo ?
    <div className={classNames(isVertical ? "d-none p-2" : "d-flex align-items-center justify-content-center")}>
        {
            !isVertical ?
                <React.Fragment>
                    <AccountAuthButton brandAccent isVertical={isVertical} onClick={() => toggleLoginCard('signup')} text="Create An Account" />
                    <LoginButton isVertical={isVertical} onClick={() => toggleLoginCard('login')} text="Login" />
                </React.Fragment>
            : null
        }
        { isLoginCardOpen ?
            <AuthCard
                onComplete={() => toggleLoginCard(false)}
                onClose={() => toggleLoginCard(false)}
                variant="modal"
                isSignup={isLoginCardOpen === "signup"}
            /> : null
        }
    </div>
    : !isVertical ?
    <div className="d-flex align-items-center">
        <CreateListButton
            as="button"
            title="Create a New List"
            className="py-4 px-3"
            onClick={() => setShowCreator(true)}
            text={<div><i className="gg-math-plus"/></div>}
        />
        <UserButton
            showDetailedView={isVertical}
            {...UserInfo}
        />
        { showCreator ? <ListEditor isNew onExit={() => setShowCreator(false)} /> : null }
    </div>
    : <UserButton
        showDetailedView={isVertical}
        {...UserInfo}
    />

};

export default AccountBox;