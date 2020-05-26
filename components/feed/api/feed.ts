import { jsonToGraphQLQuery, VariableType } from 'json-to-graphql-query';

interface userFeedAPIParams {
    fields: [string] | [],
}

function fetchUserFeedAPI({ fields= [] }: userFeedAPIParams) {

    const qr = {
        query: {
            __variables: {
                count: 'Int',
                createListAfterCursor: 'String',
                contributeItemAfterCursor: 'String',
            },
            feed: {
                userActivities: {
                    createList: {
                        __args: {
                            count: new VariableType('count'),
                            after: new VariableType('createListAfterCursor')
                        },
                        hasNext: true,
                        lastCursor: true,
                        stories: {
                            __typename: true,
                            timestamp: true,
                            list: {
                                name: true,
                                slug: true,
                                coverURL: true,
                                itemCount: true,
                                topic: {
                                    name: true,
                                    slug: true,
                                }
                            },
                            user: {
                                username: true,
                                firstName: true,
                                lastName: true,
                                avatarURL: true,
                                isVerified: true
                            }
                        }
                    },
                    contributeItem: {
                        __args: {
                            count: new VariableType('count'),
                            after: new VariableType('contributeItemAfterCursor')
                        },
                        hasNext: true,
                        lastCursor: true,
                        stories: {
                            __typename: true,
                            timestamp: true,
                            item: {
                                id: true,
                                name: true,
                                comment: true,
                                url: true,
                                media: {
                                    type: true,
                                    url: true,
                                    aspect: true,
                                },
                                votes: {
                                    userVote: true,
                                    upVotes: {
                                        count: true,
                                    },
                                    downVotes: {
                                        count: true
                                    }
                                }
                            },
                            list: {
                                name: true,
                                previewURL: true,
                                curator: {
                                    username: true,
                                }
                            },
                            user: {
                                username: true,
                                firstName: true,
                                lastName: true,
                                avatarURL: true,
                                isVerified: true
                            }
                        }
                    }
                }
            }
        }
    };

    if(!fields.includes("user_createList"))
    {
        delete qr.query.__variables.createListAfterCursor;
        delete qr.query.feed.userActivities.createList;
    }

    if(!fields.includes("user_contributeItem"))
    {
        delete qr.query.__variables.contributeItemAfterCursor;
        delete qr.query.feed.userActivities.contributeItem;
    }

    return jsonToGraphQLQuery(qr, { pretty: false }).toString();

}

export default fetchUserFeedAPI;