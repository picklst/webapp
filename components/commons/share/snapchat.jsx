import React from "react";
import Button from "../../ui/Button";

export default ({ url }) => {
    const generateLink = () => {
        return `https://www.snapchat.com/scan?attachmentUrl=${url}`;
    };

    return <Button
        target="_blank"
        rel="noreferrer noopener"
        link={generateLink()}
        text={<img alt="snapchat" src={require('../../../images/assets/icons/snapchat.svg')} className="w-100"/>}
        className="p-0 shadow w-100"
    />;
}