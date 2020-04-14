import React from 'react';
import formatDistance from 'date-fns/formatDistance'

import Card from "../../../../components/ui/Cards";

import Header from './header';

export default ({
  name, slug, curator, itemCount, properties,
  createdTimestamp, lastEditTimestamp
}) => {
    console.log(properties);

    const renderListAge = () => {
        let isEdited = false;
        if(createdTimestamp)
        {
            let timestamp = createdTimestamp;
            if(lastEditTimestamp)
            {
                isEdited = true;
                timestamp = lastEditTimestamp;
            }

            return <React.Fragment>
                {isEdited ? 'edited ' : null}
                {formatDistance(new Date(timestamp), new Date(), { addSuffix: true })}
            </React.Fragment>;
        }
        return null;
    };

    return <Card p={0}>
        <Header
            slug={slug}
            curator={curator}
            lastEditTimestamp={lastEditTimestamp}
            createdTimestamp={createdTimestamp}
        />
        <a className="d-block w-100 pb-4 px-3 plain-link" href={`/${curator.username}/${slug}`}>
            <h3 className="mb-0">{name}</h3>
            <div className="small"> {itemCount} items • 0 views • {renderListAge()}</div>
        </a>
    </Card>;

};