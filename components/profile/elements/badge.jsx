import React from "react";
import styled from '@emotion/styled'

import {NameElement} from "../index";
import formatDistance from "date-fns/formatDistance";
import format  from 'date-fns/format';

const Avatar = styled.div`
  width: ${({larger}) => larger ? '2.5rem' : '1.8rem'};
  height: ${({larger}) => larger ? '2.5rem' : '1.8rem'};
  background-image: url(${(props) => props.src});
  background-position: center;
  background-size: cover;
  border-radius: ${({rounded}) => rounded ? '100vw' : '0.15rem'};
`;

const TextWrapper = styled.div`
  display: inline-block;
  font-size: 0.9rem;
  line-height: 1.25;
  .text-secondary {
    font-size: 95%;
    display: inline-block;
    padding: 0 0.15rem;
  }
`;

const UserBadge = ({
   firstName, lastName, username,  avatarURL, timestamp,
   suffixText, prefixText,
   hideAvatar, isVerified,
}) => {

    const getTimestamp = () => {
        const diff = (new Date() - new Date(timestamp)) / (1000 * 3600 * 24);
       if(diff < 0.5)
           return formatDistance(new Date(timestamp), new Date(), { addSuffix: true });
       if(diff < 1 && new Date().getDate() === new Date(timestamp).getDate())
           return format(new Date(timestamp), "'today' B");
       if(diff < 7)
            return format(new Date(timestamp), "EEE',' do 'at' h:mm aaa");
       else
            return format(new Date(timestamp), "LLL d 'at' h:mm aaa");
    };

    return <a href={`/${username}`} className="plain-link d-flex">
        { !hideAvatar &&
            <div className="d-flex align-items-center justify-content-center pr-2">
            <Avatar
                rounded={!!suffixText}
                larger={!!suffixText}
                src={avatarURL ? avatarURL : require('../../../images/assets/placeholders/avatar.webp')}
            />
            </div>
        }
        <div className="d-flex align-items-center" style={{ width: 'auto' }}>
            <div>
                <TextWrapper>
                    {prefixText && <span className="text-secondary">{prefixText}</span>}
                    <NameElement
                        firstName={firstName}
                        lastName={lastName}
                        isVerified={isVerified}
                    />
                    {suffixText && <span className="text-secondary">{suffixText}</span> }
                </TextWrapper>
                { timestamp &&
                    <div
                        title={format(new Date(timestamp), "LLL d 'at' h:mm aaa")}
                        className="line-height-1 text-secondary small mt-1"
                    >
                        {getTimestamp()}
                    </div>
                }
            </div>
        </div>
    </a>
};

export default UserBadge;