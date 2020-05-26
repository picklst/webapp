import React from "react";
import InstagramEmbed from 'react-instagram-embed';

export default ({ type, ID, url }) => {

    return type === "post" ?
        <InstagramEmbed maxWidth={"100%"} url={url} />
    : null

}