import React from 'react';
import formatDistance from 'date-fns/formatDistance'
import parseISO from "date-fns/parseISO";

import styled from '@emotion/styled';

import {Button} from "../../../ui";


const TopicLink = styled.a`
    font-size: calc(0.8rem + 0.3vw);
    font-weight: 600;
    margin-bottom: 1rem;
    &:hover {
      text-decoration: none!important;
    }
`;

const ListTitle = styled.h4`
    font-size: calc(1rem + 0.3vw);
    font-weight: 600;
    margin-bottom: 0.5rem;
`;

export default ({
    name, description, topic, coverURL, curator,
    itemCount, timestampCreated, timestampLastEdited,
    compact, isTitleCard, hideUsername
}) =>
{

    const renderTopicButton = () =>
    <Button
        link={`/topics/${topic.slug}`}
        text={topic.name}
        className="small text-primary font-weight-bold mb-2 mx-0"
    />;

    const renderTopicText = () =>
    <TopicLink className={compact ? "small" : null} href={`/topic/${topic.slug}`}>{topic.name}</TopicLink>;

    const renderListAge = () => {
        let isEdited = false;
        if(timestampCreated)
        {
            let timestamp = timestampCreated;
            if(timestampLastEdited)
            {
                isEdited = true;
                timestamp = timestampLastEdited;
            }

            return <React.Fragment>
                {isEdited && 'edited '}
                {formatDistance(parseISO(timestamp), new Date(), { addSuffix: true })}
            </React.Fragment>;
        }
        return null;
    };

    return compact ?
    <div className="d-flex align-items-center px-2 py-2">
        { coverURL &&
            <div
                style={{
                    width: "90px",
                    height: "64px",
                    minHeight: "100%",
                    backgroundImage: `url(${coverURL})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover"
                }}
            />
        }
        <div className="d-flex pl-2 pr-1 align-items-center" style={{ width: "auto" }}>
            <div>
                {topic && renderTopicText()}
                <h6 className="line-height-1 mb-0">{name}</h6>
                {!hideUsername &&
                    <a href={`/${curator.username}`} className="small p-0 plain-link">
                        @{curator.username}
                    </a>
                }
            </div>
        </div>
    </div>
    : isTitleCard ? <div className="py-4">
        {coverURL && <img className="mb-2 w-100" src={coverURL} alt="list-cover"/>}
        <div className="px-2">
            {topic && renderTopicButton()}
            <h3 className="mb-1">{name}</h3>
            <div> {itemCount} items • {renderListAge()}</div>
            {description && <p className="mb-0 mt-3">{description}</p>}
        </div>
    </div> :
    <div className="py-2">
        {coverURL && <img className="mb-2 w-100" src={coverURL} alt="list-cover"/>}
        <div className="px-2">
            {topic && renderTopicText()}
            <ListTitle>{name}</ListTitle>
            <div className="small"> {itemCount} items • {renderListAge()}</div>
        </div>
    </div>;
};
