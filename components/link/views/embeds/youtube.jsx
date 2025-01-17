import React from "react";
import YouTube from 'react-youtube';


export default ({ type, ID, url }) => {

    return type === "video" ?
        <YouTube
            opts={{ width: '100%', minHeight: '400px' }}
            videoId={ID}
        />
    : null

}