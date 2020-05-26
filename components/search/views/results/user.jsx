import React from "react";
import styled from '@emotion/styled'

import {Avatar} from "../../../profile/elements";

const UserResultContainer = styled.a`
    display: block;
    text-decoration: none;
    color: inherit!important;
    padding: 0.5rem;
    background: white;
    &:hover {
      text-decoration: none;
      background-color: #eee;
    }
    .col-3, .col {
      display: flex;
      align-items: center;
    }
    .col-3 {
      justify-content: center;
    }
`;

const Username = styled.div`
  font-weight: 600;
  line-height: 1.1;
`;

const Name = styled.div`
  line-height: 1.1;
  font-size: 0.8rem;
`;

export default ({ user }) =>
<UserResultContainer href={`/${user.username}`} onMouseDown={(e) => { e.preventDefault(); }}>
    <div className="row m-0">
        <div className="col-3">
            <div>
                <Avatar className="position-static" size="45px" rounded url={user.avatarURL} />
            </div>
        </div>
        <div className="col p-1">
            <div>
                <Username>{user.username}</Username>
                <Name>{user.firstName} {user.lastName}</Name>
            </div>
        </div>
    </div>
</UserResultContainer>;