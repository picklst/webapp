import dataFetch from "../../utils/dataFetch";
import { jsonToGraphQLQuery, VariableType } from 'json-to-graphql-query';

interface getUserAPIParams {
    username: string,
    fields: object,
    endpoint: string
}

async function getUser({ username, fields, endpoint})
{
    const query = jsonToGraphQLQuery({
        query: {
            __variables: {
                username: 'String!',
            },
            getUser: {
                __args: {
                    username: new VariableType('username')
                },
                publicInfo: {
                    firstName: fields.includes("firstName"),
                    lastName: fields.includes("lastName"),
                    avatarURL: fields.includes("avatarURL"),
                    username: true,
                }
            },
        }
    }, { pretty: false }).toString();
    return await dataFetch({ query, variables: { username } }, endpoint).then(res => res);
}

async function getUserAPI(params: getUserAPIParams)
{
    return await getUser(params).then(response => {
        if (response.errors) {
            return { errors: response.errors };
        } else if(response.data) {
            return response.data.getUser.publicInfo;
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

export default getUserAPI;