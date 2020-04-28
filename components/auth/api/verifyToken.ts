import dataFetch from "../../../utils/dataFetch";
// @ts-ignore
import {setUsername, setToken, setRefreshToken, setUserInfo} from '../../../actions/states/Auth.ts';

interface tokenAuthParams { token: string}

async function getAuthToken(token: string)
{
    const query = `mutation verify_token($token: String!){
      verifyToken(token: $token)
      {
        payload
      }
    }`;
    return await dataFetch({ query, variables: { token } }).then(res => res);
}

async function verifyTokenAPI({token}: tokenAuthParams)
{
    return await getAuthToken(token).then(response => {
        if (response.errors) {
            setToken(null);
            setRefreshToken(null);
            setUsername(null);
            setUserInfo(null);
            console.error("We have an error in authenticating you.");
            return { errors: response.errors };
        } else if(response.data) {
            return response.data.verifyToken;
        } else {
            console.error("We are facing technical issues in authenticating you.");
            return { errors: [
                {message: "We tried our best, but we got no response from our servers. Please try refreshing the page or coming back later."}
            ]};
        }
    });
}

export default verifyTokenAPI;