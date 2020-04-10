import React from 'react';
import LinkPreview from "../../../editor/link/preview";

const ItemCardViewer = ({ name, comment, url }) => {

   return <div>
        <h3>{name}</h3>
        <p className="m-0">{comment}</p>
        { url ? <LinkPreview url={url} /> : null}
    </div>

};

export default ItemCardViewer;