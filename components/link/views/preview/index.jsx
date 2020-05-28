import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExternalLinkAlt} from "@fortawesome/free-solid-svg-icons";

export default ({ url, image, title, description }) => {

    const renderLoaded = () =>
    <a href={url} target="_blank" className="d-block p-3 plain-link">
        <div className="row m-0">
            { image && image.length > 0 &&
                <div className="col-4 d-flex align-items-center justify-content-center px-2">
                    <img alt="url thumbnail" src={image} className="w-100" />
                </div>
            }
            <div className="col px-0">
                <h6 className="mb-1">{title}</h6>
                <div className="small" style={{ overflow: 'hidden' }}>{url}</div>
            </div>
        </div>
        <p className="small mt-1 mb-0">{description}</p>
    </a>;

    const renderSimple = () =>
    <a href={url} target="_blank" className="d-block p-3 plain-link">
        <div className="text-primary w-100">
            <FontAwesomeIcon icon={faExternalLinkAlt} />
            <span className="pl-2">{url}</span>
        </div>
    </a>;

    return title && title.length > 0 ? renderLoaded() : renderSimple()
}