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
    const query = jsonToGraphQLQuery({
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
                slug: true,
            },
        }
    }, { pretty: false }).toString();
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