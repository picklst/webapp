import dataFetch from "../../utils/dataFetch";
import { jsonToGraphQLQuery, VariableType } from 'json-to-graphql-query';

interface getListAPIParams {
    slug: string,
    username: string,
    fields: object,
    endpoint: string
}

async function getList({ slug, username, fields, endpoint})
{
    const q = {
        query: {
            __variables: {
                slug: 'String!',
                username: 'String!',
            },
            getList: {
                __args: {
                    username: new VariableType('username'),
                    slug: new VariableType('slug'),
                },
                name: fields.includes("name"),
                description: fields.includes("description"),
                curator: {
                    publicInfo: {
                        firstName: true,
                        lastName: true,
                        avatarURL: true,
                        username: true,
                    }
                },
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
                items: {
                    name: true,
                    key: true,
                    comment: true,
                    url: true,
                    position: true,
                },
                slug: true,
            },
        }
    };
    if(username == null)
    {
        delete(q.query.__variables.username);
        delete(q.query.getList.__args.username);
    }
    const ignoreFields = [];
    if(!fields.includes("curator"))
        ignoreFields.push("curator");
    if(!fields.includes("properties"))
        ignoreFields.push("properties");
    if(!fields.includes("items"))
        ignoreFields.push("items");
    const query = jsonToGraphQLQuery(q, { pretty: false, ignoreFields }).toString();
    return await dataFetch({ query, variables: { username, slug } }, endpoint).then(res => res);
}

async function getListAPI(params: getListAPIParams)
{
    return await getList(params).then(response => {
        if (response.errors) {
            return { errors: response.errors };
        } else if(response.data) {
            // @todo move tweaks to seperate utils func.
            // tweaking curator data returned for direct access with curator.firstname etc.
            if(params.fields.includes("curator"))
                response.data.getList.curator = response.data.getList.curator.publicInfo;
            return response.data.getList;
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

export default getListAPI;