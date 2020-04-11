import React from 'react';
import Card from "../../../components/ui/Cards";

const ListCard = ({
    name, slug, username,
    createdTimestamp, lastEditTimestamp
 }) => {

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
            return <div>
                {timestamp.toString()}
            </div>
        }
        return null;
    };

    return <a className="d-block w-100 plain-link" href={`/${username}/${slug}`}>
        <Card
            p={4}
        >
            {renderListAge}
            <h3>{name}</h3>
        </Card>
    </a>;

};

export default ListCard;