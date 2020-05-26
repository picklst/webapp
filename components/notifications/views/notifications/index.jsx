import React from "react";
import shortid from "shortid";
import {NotificationCard} from "../index";

export default ({ notifications }) => {

    return <div>
        {
            notifications && notifications.length > 0 ?
                notifications.map((s) => <NotificationCard key={shortid.generate()} {...s} />) : null
        }
    </div>
}