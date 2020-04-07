import dataFetch from "../../utils/dataFetch";
import { jsonToGraphQLQuery, VariableType } from 'json-to-graphql-query';

interface searchUserAPIParams {
    key: string,
    fields: object,
}

async function searchUser({ key, fields})
{
    const query = jsonToGraphQLQuery({
        query: {
            __variables: {
                key: 'String!',
            },
            searchUser: {
                __args: {
                    key: new VariableType('key')
                },
                firstName: fields.includes("firstName"),
                lastName: fields.includes("lastName"),
                name: fields.includes("name"),
                avatarURL: fields.includes("avatarURL"),
                username: true,
            },
        }
    }, { pretty: false }).toString();
    return await dataFetch({ query, variables: { key } }).then(res => res);
}

async function searchUserAPI(params: searchUserAPIParams)
{
    return await searchUser(params).then(response => {
        if (response.errors) {
            return { errors: response.errors };
        } else if(response.data) {
            return response.data.searchUser;
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

export default searchUserAPI;