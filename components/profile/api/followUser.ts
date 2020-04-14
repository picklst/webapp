import dataFetch from "../../../utils/dataFetch";

interface followUserAPIParams {
    username: string,
}

async function followUser({ username })
{
    const query = `mutation follow_user($username: String!)
    {
        followUser(username: $username)
    }`;
    return await dataFetch({ query, variables: { username } }).then(res => res);
}

async function followUserAPI(params: followUserAPIParams)
{
    return await followUser(params).then(response => {
        if (response.errors) {
            return { errors: response.errors };
        } else if(response.data) {
            return response.data.followUser;
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

export default followUserAPI;