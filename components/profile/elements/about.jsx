import React from 'react';

const UserInfo = ({ firstName, lastName, username, isVerified, bio, url }) => {

    return  <div>
        <h3 className="m-0">
            {firstName} {lastName}
            {   isVerified ?
                <img
                    src={require('../../../images/assets/icons/verified_badge.svg')}
                    style={{ width: '24px', marginLeft: '0.25rem' }}
                    alt="Verified Profile"
                /> : null
            }
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