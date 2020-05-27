import { jsonToGraphQLQuery, VariableType } from 'json-to-graphql-query';

interface getListsAPIParams {
    fields: [string] | [],
    args: [string] | [] | null,
}

function getListAPI({ fields= [], args= [] }: getListsAPIParams)
{
    const qr = {
        query: {
            __variables: {
                slug: 'String!',
                username: 'String!',
                itemCount: args.includes("itemCount") ? 'Int' : 'Int = 20',
                itemStarting: args.includes("itemStarting") ? 'String' : 'String = "-1"'
            },
            list: {
                __args: {
                    slug: new VariableType('slug'),
                    username: new VariableType('username'),
                },
                name: fields.includes("name"),
                timestampCreated: fields.includes("timestampCreated"),
                timestampLastEdited: fields.includes("timestampLastEdited"),
                description: fields.includes("description"),
                coverURL: fields.includes("coverURL"),
                properties: {
                    isPrivate: true,
                    isRanked: true,
                    forceCuratorRanking: true,
                    isVotable: true,
                    areVotesPrivate: true,
                    canVoteMultipleItems: true,
                    isRateable: true,
                    areRatingsPrivate: true,
                    acceptEntries: true
                },
                topic: {
                    slug: true,
                    name: true,
                },
                curator: {
                    username: true,
                    firstName: true,
                    lastName: true,
                    avatarURL: true,
                    isVerified: true,
                },
                items: {
                    __args: {
                        count: new VariableType('itemCount'),
                        starting: new VariableType('itemStarting'),
                    },
                    position: true,
                    id: true,
                    nextItem: true,
                    item: {
                        name: true,
                        comment: true,
                        url: true,
                        media: {
                            id: true,
                            url: true,
                            type: true,
                            aspect: true
                        },
                        poll: {
                            hasAnswer: true,
                            answer: true,
                            userVotedOption: true,
                            options: {
                                id: true,
                                name: true,
                                media: {
                                    id: true,
                                    url: true,
                                    type: true,
                                    aspect: true
                                }
                            }
                        },
                        contributor: {
                            username: true,
                            firstName: true,
                            lastName: true,
                            avatarURL: true,
                            isVerified: true,
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
                },
                userVote: {
                    id: true
                },
                itemCount: fields.includes("itemCount"),
                userCanEdit: fields.includes("userCanEdit"),
                hasEntries: fields.includes("hasEntries"),
                slug: true,
            },
        }
    };

    const ignoreFields = [];
    if(!fields.includes("topic"))
        ignoreFields.push("topic");
    if(!fields.includes("userVote"))
        ignoreFields.push("userVote");
    if(!fields.includes("curator"))
        ignoreFields.push("curator");
    if(!fields.includes("properties"))
        ignoreFields.push("properties");
    if(!fields.includes("items"))
    {
        delete qr.query.__variables.itemCount;
        delete qr.query.__variables.itemStarting;
        delete qr.query.list.items.__args;
        ignoreFields.push("items");
    }

    return jsonToGraphQLQuery(qr, { pretty: true, ignoreFields }).toString();
}

export default getListAPI;