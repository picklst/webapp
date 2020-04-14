import dataFetch from "../../utils/dataFetch";
import { jsonToGraphQLQuery, VariableType } from 'json-to-graphql-query';

interface getListsAPIParams {
    query: {
        username: string
    },
    fields: [
        string
    ]
    limit: number,
    offset: number
}

async function getLists({ fields, query: q, limit, offset })
{
    const qr = {
        query: {
            __variables: {
                limit: 'Int',
                offset: 'Int',
            },
            getLists: {
                __args: {
                    query: q,
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
    const query = jsonToGraphQLQuery(qr, { pretty: false, ignoreFields }).toString();
    return await dataFetch({ query, variables: { limit, offset } }).then(res => res);
}

async function getListsAPI(params: getListsAPIParams)
{
    return await getLists(params).then(response => {
        if (response.errors) {
            return { errors: response.errors };
        } else if(response.data) {
            return response.data.getLists;
        } else {
            return { errors: [
                {
                    message: "We tried our best, but we got no response from our servers. Please try refreshing the page or coming back later.",
                    response: response
                }
            ]};
        }
    });
}

export default getListsAPI;