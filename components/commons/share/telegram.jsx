import Button from "../../ui/Button";
import React from "react";

export default ({ message, url }) => {
    const generateLink = () => {
        const link = `url=${encodeURIComponent(String(url))}`;
        const params =  message ? `text=${encodeURIComponent(String(message))}` + link : link;
        return `https://telegram.me/share?${params}`;
    };

    return <Button
        target="_blank"
        rel="noreferrer noopener"
        link={generateLink()}
        text={<img alt="telegram" src={require('../../../images/assets/icons/telegram.svg')} className="w-100"/>}
        className="p-0 shadow w-100"
    />;
}