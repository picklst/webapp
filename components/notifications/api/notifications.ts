import { jsonToGraphQLQuery, VariableType } from 'json-to-graphql-query';

interface userNotificationsAPIParams {
    fields: [string] | [],
}

function userNotificationsAPI({ fields= [] }: userNotificationsAPIParams) {
    const notificationObj = {
        timestamp: true,
        actor: {
            username: true,
            firstName: true,
            lastName: true,
            avatarURL: true,
        },
        action: {
            phrase: true,
            type: true,
            url: true
        },
        resource: {
            title: true,
            type: true,
            url: true
        }
    };

    const notificationQueryObj = {
        hasNext: true,
        lastCursor: true,
        notifications: {...notificationObj}
    };

    const qr = {
        query: {
            notifications: {
                critical: {...notificationObj},
                reactions: {
                   startedFollowing: {...notificationQueryObj}
                },
                requests: {
                    listRequests: {...notificationQueryObj}
                }
            }
        }
    };
    return jsonToGraphQLQuery(qr, { pretty: false }).toString();
}

export default userNotificationsAPI;