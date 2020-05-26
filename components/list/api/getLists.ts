import { jsonToGraphQLQuery, VariableType } from 'json-to-graphql-query';

interface getListsAPIParams {
    fields: [
        string
    ]
}

function getListsAPI({ fields }: getListsAPIParams)
{
    const qr = {
        query: {
            __variables: {
                query: 'ListQueryInput!',
                count: 'Int',
                after: 'String',
            },
            lists: {
                __args: {
                    query: new VariableType('query'),
                    count: new VariableType('count'),
                    after: new VariableType('after'),
                },
                lists: {
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
                    itemCount: fields.includes("itemCount"),
                    userCanEdit: fields.includes("userCanEdit"),
                    slug: true,
                },
                hasNext: true,
                lastCursor: true
            },
        }
    };
    const ignoreFields = [];
    if(!fields.includes("topic"))
        ignoreFields.push("topic");
    if(!fields.includes("curator"))
        ignoreFields.push("curator");
    if(!fields.includes("properties"))
        ignoreFields.push("properties");
    if(!fields.includes("items"))
        ignoreFields.push("items");

   return jsonToGraphQLQuery(qr, { pretty: false, ignoreFields }).toString();
}

export default getListsAPI;