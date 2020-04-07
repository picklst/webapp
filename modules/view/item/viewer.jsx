import React from 'react';
import LinkPreview from "../../editor/link/preview";
import Card from "../../../components/ui/Cards";


const ListItemViewer = ({ name, comment, url }) => {

    return <Card hasShadow={false}>
        <h3>{name}</h3>
        <p>{comment}</p>
        { url ? <LinkPreview url={url} /> : null}
    </Card>
};

export default ListItemViewer;

