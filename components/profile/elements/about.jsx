import React from 'react';

import { Name } from '../elements'

const UserInfo = ({ firstName, lastName, username, isVerified, bio, url }) => {

    return  <div>
        <h3 className="m-0">
            <Name firstName={firstName} lastName={lastName} isVerified={isVerified} />
        </h3>
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