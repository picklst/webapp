import React from "react";
import Card from "../../../components/ui/Cards";
import Button from "../../../components/ui/Button";

const ListHeaderViewer = ({
    name, slug, cover, curator
}) => {

    return <Card
        hasShadow
        className="mb-4 rounded-0"
    >
        <h1>{name}</h1>
        <div>By {curator.firstName} {curator.lastName}</div>
        <Button
            text="Edit List"
            link={`/edit/${slug}`}
        />
    </Card>
};

export default ListHeaderViewer;