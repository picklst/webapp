import React from "react";
import Button from "../../ui/Button";

export default ({ title, description, url }) => {
    const generateLink = () => {
        const link = `url=${encodeURIComponent(String(url))}`;
        const title = title ? `title=${encodeURIComponent(String(title))}` + link : link;
        const params = description ? `summary=${encodeURIComponent(String(description))}` + title : title;
        return `https://linkedin.com/sharing/share-offsite/?mini=true&${params}`;
    };

    return <Button
        target="_blank"
        rel="noreferrer noopener"
        link={generateLink()}
        text={<img alt="linkedin" src={require('../../../images/assets/icons/linkedin.svg')} className="w-100"/>}
        className="p-0 shadow w-100"
    />;
}