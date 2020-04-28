import Card from "../../../ui/Cards";
import React from "react";

import Header from "./header";
import Body from "./body";

export default ({
    name, comment, url, media, entityID, userCanEdit, className, onEdit,
}) =>
<Card
    className={className}
    p={3}
>
    <Header
        name={name}
        userCanEdit={userCanEdit}
        onEdit={onEdit}
    />
    <Body
        name={name}
        comment={comment}
        media={media}
        url={url}
    />
</Card>


