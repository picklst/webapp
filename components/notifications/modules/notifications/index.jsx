import React, {useEffect, useState} from "react";
import { userNotificationsAPI } from "../../api";
import {APIRequest} from "../../../../utils";
import {NotificationsViewer} from "../../views";

export default ({ }) => {

    const [notifications, setNotifications] = useState([]);

    const fetchNotifications = () => {
        const query = userNotificationsAPI({ fields: [] });
        APIRequest({ query, requireAuth: true }).then((data) => {
            if(data && data.notifications)
                generateNotifications(data.notifications);
        }).catch((errors) => {

        });
    };

    const generateNotifications = ({ requests, reactions, critical }) => {
        const notifications = [];
        if(requests.listRequests)
        {
            requests.listRequests.notifications.forEach((i) => {
                notifications.push({
                    type: "list_request",
                    actor: i['actor'],
                    action: i['action'],
                    timestamp: i['timestamp']
                })
            })
        }
        if(reactions.startedFollowing)
        {
            reactions.startedFollowing.notifications.forEach((i) => {
                notifications.push({
                    type: "list_request",
                    actor: i['actor'],
                    action: i['action'],
                    timestamp: i['timestamp']
                })
            })
        }
        if(critical)
        {
            critical.forEach((i) => {
                notifications.push({
                    type: "critical",
                    actor: i['actor'],
                    action: i['action'],
                    resource: i['resource'],
                    timestamp: i['timestamp']
                })
            })
        }
        notifications.sort(function(a, b) {
            const x = a['timestamp'];
            const y = b['timestamp'];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0)) * -1;
        });
        setNotifications(notifications);
    };

    useEffect(fetchNotifications, []);

    return <NotificationsViewer notifications={notifications} />

}