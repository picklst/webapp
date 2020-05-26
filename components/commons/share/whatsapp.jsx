import Button from "../../ui/Button";
import React from "react";

export default ({ message, url }) => {

    const isMobile = () => /(android|iphone|ipad|mobile)/i.test(navigator.userAgent);

    const generateLink = () => {
        const link = encodeURIComponent(String(url));
        const text =  message ? encodeURIComponent(String(message)) + link : link;
        return `https://${isMobile() ? 'api' : 'web'}.whatsapp.com/send?text=${text}`;
    };

    return <Button
        target="_blank"
        rel="noreferrer noopener"
        link={generateLink()}
        text={
            <img
                alt="whatsapp"
                src={require('../../../images/assets/icons/whatsapp.svg')}
                className="w-100"
            />
        }
        className="p-0 shadow w-100"
    />;
}