import React from "react";
import styled from '@emotion/styled'

import { Name } from "./index";
import Avatar from "./avatar";


const ButtonWrap = styled.a`
  padding: ${(props) => props.paddingY} ${(props) => props.paddingX};
  color: inherit;
  border-radius: ${(props) => props.borderRadius};
  background-color: #ECEFF1;
  &:hover, &:focus {
    background-color: #CFD8DC;
    text-decoration: none;
    color: inherit;
  }
`;

const NameContainer = styled.div`font-size: 0.9rem; font-weight: bold;`;
const UsernameContainer = styled.div`font-size: 0.75rem; margin-top: 0.25rem`;

const UserButton = ({ firstName, lastName, username, isVerified, avatarURL, showDetailedView }) => {

    return <ButtonWrap
        title="Open your profile"
        borderRadius={showDetailedView ? 0 : "0.5rem"}
        paddingY={showDetailedView ? "1.5rem" : "0.5rem"}
        paddingX="0.75rem"
        href={`/${username}`}
        className="d-flex align-items-center justify-content-center"
    >
        <Avatar className="position-static" rounded url={avatarURL} size={showDetailedView ? '2.5rem' : '2rem'} />
        <div className="pl-2" style={{ width: 'auto', lineHeight: 1.1 }}>
            <NameContainer><Name firstName={firstName ? firstName : `@${username}`} lastName={showDetailedView ? lastName : null} isVerified={isVerified} /></NameContainer>
            { showDetailedView && firstName ? <UsernameContainer>@{username}</UsernameContainer> : null }
        </div>
    </ButtonWrap>
};

export default UserButton;