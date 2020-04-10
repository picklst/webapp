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
                firstName: fields.includes("firstName"),
                lastName: fields.includes("lastName"),
                stats: {
                    listsCreatedCount: fields.includes("listCreatedCount"),
                    followersCount: fields.includes("followersCount"),
                    followingCount: fields.includes("followingCount")
                },
                isVerified: fields.includes("isVerified"),
                isProfilePrivate: fields.includes("isVerified"),
                isBusinessProfile: fields.includes("isBusinessProfile"),
                bio: fields.includes("bio"),
                url: fields.includes("url"),
                coverURL: fields.includes("coverURL"),
                avatarURL: fields.includes("avatarURL"),
                email: fields.includes("email"),
                // followers: {
                //     firstName: false,
                //     lastName: false,
                //     username: false,
                //     avatarURL: false,
                // },
                // following: {
                //     firstName: false,
                //     lastName: false,
                //     username: false,
                //     avatarURL: false,
                // },
                username: true,
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
            return response.data.getUser;
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