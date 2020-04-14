import dataFetch from "../../../utils/dataFetch";

interface isFollowerAPIParams {
    username: string,
}

async function isFollower({ username })
{
    const query = `query is_follower($username: String!) {
        isFollower(username: $username)
    }`;
    return await dataFetch({ query, variables: { username } }).then(res => res);
}

async function isFollowerAPI(params: isFollowerAPIParams)
{
    return await isFollower(params).then(response => {
        if (response.errors) {
            return { errors: response.errors };
        } else if(response.data) {
            return response.data.isFollower;
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

export default isFollowerAPI;