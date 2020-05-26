import React from 'react';
import styled from '@emotion/styled'

import { Dropdown } from "../../../ui";

import { SettingsMenu } from "../../../auth";

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

export default ({ }) => {

    const renderButton =
    <AccountDropdownButton title="Account Dropdown">
        <i className="gg-chevron-down" />
    </AccountDropdownButton>;

    return <Dropdown
        triggerComponent={renderButton}
        dropdownComponent={<SettingsMenu />}
    />

};