import Button from "../../ui/Button";
import React from "react";

export default ({ message, url }) => {

    const generateLink = () => {
        const link = encodeURIComponent(String(url));
        const text =  message ? encodeURIComponent(String(message)) + ' ' + link : link;
        return `https://twitter.com/intent/tweet?text=${text}`;
    };

    return <Button
        target="_blank"
        rel="noreferrer noopener"
        link={generateLink()}
        text={<img alt="twitter" src={require('../../../images/assets/icons/twitter.svg')} className="w-100"/>}
        className="p-0 shadow w-100"
    />;
}