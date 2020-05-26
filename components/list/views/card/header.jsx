import React from 'react';
import styled from '@emotion/styled';

import { UserBadge } from '../../../profile'
import Action from './actions';

const HeaderWrapper = styled.div`
  padding: 0.75rem
`;

export default ({
    slug, curator, userCanEdit,
    onEdit, onDelete,
}) => {

    return <HeaderWrapper className="row m-0">
        <div className="col-10 d-flex align-items-center p-0">
            <UserBadge {...curator} />
        </div>
        <div className="col-2 d-flex justify-content-end align-items-center px-2">
            <Action
                username={curator.username}
                slug={slug}
                userCanEdit={userCanEdit}
                onEdit={onEdit}
                onDelete={onDelete}
            />
        </div>
    </HeaderWrapper>;

};