import dataFetch from "../../utils/dataFetch";
import { setUsername, setToken, setRefreshToken } from '../states/Auth.ts';

interface tokenAuthParams { username: string, password: string }

async function getAuthToken(username: string, password: string)
{
    const query = `mutation TokenAuth($username: String!, $password: String!) {
        tokenAuth(username: $username, password: $password) {
            token
            refreshToken
        }
    }`;
    const variables = { username, password };
    return await dataFetch({ query, variables }).then(res => res);
}

async function Login({username, password}: tokenAuthParams)
{
    return await getAuthToken(username, password).then(response => {
        if (response.errors) {
            console.error("error in auth");
            return { errors: response.errors };
        } else {
            setToken(response.data.tokenAuth.refreshToken);
            setUsername(username);
            setRefreshToken(response.data.tokenAuth.token);
            return response.data.tokenAuth;
        }
    });
}

export default Login;