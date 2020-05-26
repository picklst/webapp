import React from "react";
import { TwitterTweetEmbed, TwitterTimelineEmbed } from 'react-twitter-embed';

export default ({ type, ID, url }) => {

    return type === "tweet" ?
        <TwitterTweetEmbed
            options={{ width: '100%' }}
            tweetId={ID}
        />
    : type === "profile" ?
        <TwitterTimelineEmbed
            sourceType="profile"
            screenName={ID}
            options={{
                height: 400,
                width: '100%'
            }}
        />
    : null;
}