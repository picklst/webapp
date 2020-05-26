import { jsonToGraphQLQuery, VariableType } from 'json-to-graphql-query';

interface getUserAPIParams {
    fields: [string],
}

function getUserAPI({ fields}: getUserAPIParams)
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
    return jsonToGraphQLQuery(q, { pretty: false, ignoreFields }).toString();
}

export default getUserAPI;