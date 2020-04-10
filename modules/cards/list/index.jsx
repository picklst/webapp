import React from 'react';
import Card from "../../../components/ui/Cards";

const ListCard = ({
    name, slug, username
 }) => {

    return <a className="d-block w-100 plain-link" href={`/${username}/${slug}`}>
        <Card
            p={4}
        >
            <h3>{name}</h3>
        </Card>
    </a>;

};

export default ListCard;