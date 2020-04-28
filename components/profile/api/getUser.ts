import APICall from "../../../utils/APICall.ts";

import { jsonToGraphQLQuery, VariableType } from 'json-to-graphql-query';

interface getUserAPIParams {
    username: string,
    fields: [string],
    endpoint: string,
    requireAuth: boolean,
}

async function getUserAPI({ fields, username, endpoint, requireAuth}: getUserAPIParams)
{
    const q = {
        query: {
            __variables: {
                username: 'String!',
            },
            user: {
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
                // isOwnProfile: fields.includes("isOwnProfile"),
                username: true,
            },
        }
    };
    const ignoreFields = [];
    if(!fields.includes("stats"))
        ignoreFields.push("stats");
    const query = jsonToGraphQLQuery(q, { pretty: false, ignoreFields }).toString();

    return await APICall({ query, variables: { username }, requireAuth: requireAuth, endpoint}).then((res) =>
    { return res && res.data ? res.data.user : res; }
    );
}

export default getUserAPI;