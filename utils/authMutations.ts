import Cookies from 'universal-cookie';
import fromUnixTime from 'date-fns/fromUnixTime'

import { GraphQLFetch } from "./fetch.ts";
import { API } from '../constants';
import { setUserInfo } from "../actions/states/Auth.ts";

const cookies = new Cookies();


function setCookies({ payload, refreshExpiresIn }) {
    cookies.set(
        'JWTTokenExpiry',
        payload.exp,
        {
            expires: fromUnixTime(payload.exp)
        }
    );
    cookies.set(
        'JWTRefreshExpiry',
        refreshExpiresIn,
        {
            expires: fromUnixTime(refreshExpiresIn)
        }
    );
}

export async function TokenCreate({
    username, password,
    endpoint = API.providers[0].endpoint
}){
    const query = `mutation create_token($username: String!, $password: String!) {
      tokenCreate(username: $username, password: $password){
        payload
        refreshExpiresIn
        user
        {
          username
          firstName
          lastName
          avatarURL
        }
      }
    }`;
    const variables = { username, password };
    return await GraphQLFetch({ query, variables, endpoint }).then((response) => {
        setCookies(response.data.tokenCreate);
        setUserInfo(response.data.tokenCreate.user);
        return response.data.tokenCreate;
    })
}

export async function TokenRefresh({ endpoint = API.providers[0].endpoint }) {
    const mutation = `mutation { 
        tokenRefresh 
        { 
            payload 
            refreshExpiresIn 
        } 
    }`;
    const response = await GraphQLFetch({ query: mutation, endpoint });
    if(response.hasOwnProperty('errors'))
        throw Error("REFRESHING_TOKEN_FAILED");
    else {
        setCookies(response.data.tokenRefresh);
        return response.data.tokenRefresh;
    }
}

