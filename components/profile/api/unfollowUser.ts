import dataFetch from "../../../utils/dataFetch";

interface unfollowUserAPIParams {
    username: string,
}

async function unfollowUser({ username })
{
    const query = `mutation unfollow_user($username: String!)
    {
        unfollowUser(username: $username)
    }`;
    return await dataFetch({ query, variables: { username } }).then(res => res);
}

async function unfollowUserAPI(params: unfollowUserAPIParams)
{
    return await unfollowUser(params).then(response => {
        if (response.errors) {
            return { errors: response.errors };
        } else if(response.data) {
            return response.data.unfollowUser;
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

export default unfollowUserAPI;