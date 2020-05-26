import React from "react";
import shortid from "shortid";

import ContributedItemCard from './contributedItem';
import CreatedListCard from './createdList';

export default ({ stories }) => {

    return <div>
    {
        stories && stories.length > 0 ?
            stories.map((s) => {
                if(s['type'] === "user_create_list")
                    return <CreatedListCard key={shortid.generate()} story={s} />;
                else if(s['type'] === "user_contribute_item")
                    return <ContributedItemCard key={shortid.generate()} story={s} />;
                return null;
            }) : null
    }
    </div>
}