import Button from "../../ui/Button";
import React from "react";

export default ({ message, url }) => {
    const generateLink = () => {
        const link = `url=${encodeURIComponent(String(url))}`;
        const params =  message ? `title=${encodeURIComponent(String(message))}` + link : link;
        return `https://www.reddit.com/submit?${params}`;
    };

    return <Button
        target="_blank"
        rel="noreferrer noopener"
        link={generateLink()}
        text={<img alt="reddit" src={require('../../../images/assets/icons/reddit.svg')} className="w-100"/>}
        className="p-0 shadow w-100"
    />;
}