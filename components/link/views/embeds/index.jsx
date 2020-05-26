import React from "react";

import YoutubeProvider from './youtube';
import TwitterProvider from './twitter';
import InstagramProvider from './instagram';

export default ({ provider, type, ID, url }) => {

    const renderEmbed = () => {
        if(provider === 'youtube')
            return <YoutubeProvider type={type} ID={ID} url={url} />;
        if(provider === 'twitter')
            return <TwitterProvider type={type} ID={ID} url={url} />;
        if(provider === 'instagram')
            return <InstagramProvider type={type} ID={ID} url={url} />;
        return null;
    };

    return renderEmbed()
};