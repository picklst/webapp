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
                limit: 'Int',
                offset: 'Int',
            },
            lists: {
                __args: {
                    query: new VariableType('query'),
                    limit: new VariableType('limit'),
                    offset: new VariableType('offset'),
                },
                name: fields.includes("name"),
                createdTimestamp: fields.includes("createdTimestamp"),
                lastUpdateTimestamp: fields.includes("lastUpdateTimestamp"),
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
        }
    };
    const ignoreFields = [];
    if(!fields.includes("curator"))
        ignoreFields.push("curator");
    if(!fields.includes("properties"))
        ignoreFields.push("properties");
    if(!fields.includes("items"))
        ignoreFields.push("items");

   return jsonToGraphQLQuery(qr, { pretty: false, ignoreFields }).toString();
}

export default getListsAPI;