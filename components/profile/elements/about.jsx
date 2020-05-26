import React from 'react';

import { Name } from '../elements'

const UserInfo = ({ firstName, lastName, username, isVerified, bio, url }) => {

    return  <div>
        <h5 className="m-0">
            <Name firstName={firstName ? firstName : username} lastName={lastName} isVerified={isVerified} />
        </h5>
        <div>@{username}</div>
        <p className="my-2">{bio}</p>
        {
            url ?
                <div className="my-2">
                    <a href={url}>{url}</a>
                </div> : null
        }

    </div>

};

export default UserInfo;