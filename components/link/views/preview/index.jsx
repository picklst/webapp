import React from "react";
import styled from "@emotion/styled";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExternalLinkAlt} from "@fortawesome/free-solid-svg-icons";

const IconContainer = styled.div`
    min-height: 64px;
    max-height: 5vh;
    width: auto;
    min-width: 64px;
    background-image: ${({ url }) => `url(${url})`};
    background-position: top;
    background-size: contain;
    background-repeat: no-repeat;
}`;

const DescriptionContainer = styled.p`
  margin-top: 1rem;
  line-height: 1.35;
  font-size: 0.8rem;
  margin-bottom: 0;
`;

export default ({ url, image, title, description }) => {

    const renderLoaded = () =>
    <a href={url} target="_blank" className="d-block p-3 plain-link">
        <div className="d-flex">
            { image && image.length > 0 &&
                <IconContainer url={image} />
            }
            <div style={{ width: 'auto' }} className="px-2 d-flex align-items-center">
                <div>
                    <h6 className="mb-1">{title}</h6>
                    <div className="small text-primary" style={{ overflow: 'hidden' }}>{url}</div>
                </div>
            </div>
        </div>
        {description &&
            <DescriptionContainer>{description}</DescriptionContainer>
        }
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