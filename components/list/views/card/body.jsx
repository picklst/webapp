import React from 'react';
import formatDistance from 'date-fns/formatDistance'

export default ({ name, itemCount, createdTimestamp, lastEditTimestamp, isTitleCard }) =>
{
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

    return isTitleCard ?
    <div className="py-4 px-2">
        <h1 className="mb-2">{name}</h1>
        <div> {itemCount} items • 0 views • {renderListAge()}</div>
    </div> :
    <div>
        <h3 className="mb-0">{name}</h3>
        <div className="small"> {itemCount} items • 0 views • {renderListAge()}</div>
    </div>;
};
