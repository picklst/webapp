import React from "react";
import Button from "../../ui/Button";

export default ({ message, url }) => {
    const generateLink = () => {
        const link = `u=${encodeURIComponent(String(url))}`;
        const params = message ? `quote=${encodeURIComponent(String(message))}` + link : link;
        return `https://www.facebook.com/sharer/sharer.php?${params}`;
    };

    return <Button
        target="_blank"
        rel="noreferrer noopener"
        link={generateLink()}
        text={<img alt="facebook" src={require('../../../images/assets/icons/facebook.svg')} className="w-100"/>}
        className="p-0 shadow w-100"
    />;
}