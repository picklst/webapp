import React from 'react';
import styled from 'styled-components';

import { NameElement } from '../../../profile'
import Action from './actions';

const HeaderWrapper = styled.div`
  padding: 0.75rem;
`;

const Avatar = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  background-image: url(${(props) => props.src});
  background-position: center;
  background-size: cover;
  border-radius: 0.25rem;
`;

export default ({
    slug, curator: { firstName, lastName, username, avatarURL, isVerified }, userCanEdit
}) => {

    const renderCuratorCard = () =>
    <a href={`/${username}`} className="plain-link d-flex">
        <Avatar src={avatarURL} />
        <div className="pl-1 small font-weight-bold d-flex align-items-center line-height-1" style={{ width: 'auto' }}>
            <NameElement firstName={firstName} lastName={lastName} isVerified={isVerified} />
        </div>
    </a>;

    return <HeaderWrapper className="row m-0">
        <div className="col-10 d-flex align-items-center p-0">
            {renderCuratorCard()}
        </div>
        <div className="col-2 d-flex justify-content-end align-items-center px-2">
            <Action
                username={username}
                slug={slug}
                userCanEdit={userCanEdit}
            />
        </div>
    </HeaderWrapper>;

};