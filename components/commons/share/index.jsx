import React from "react";
import styled from '@emotion/styled'
import { CopyLink } from "../index";

import WhatsAppButton from './whatsapp';
import TwitterButton from './twitter';
import FacebookButton from './facebook';
import TelegramButton from './telegram';
import RedditButton from './reddit';
import LinkedInButton from './linkedin';
import SnapchatButton from './snapchat';

const ShareButtons = styled.div`
    button {
      box-shadow: none!important;
      margin: 0 0.25rem;
      img {
        max-width: 36px;
      }
    }
`;

export default ({ url, title, description }) => {

    return <div>
        <CopyLink url={url} />
        <ShareButtons className="d-flex justify-content-center mt-3">
            <WhatsAppButton url={url} message={title} />
            <FacebookButton url={url} message={title} />
            <TwitterButton url={url} message={title} />
            <TelegramButton url={url} message={title} />
            <RedditButton url={url} message={title} />
            <SnapchatButton url={url} />
            <LinkedInButton url={url} title={title} description={description} />
        </ShareButtons>
    </div>
}