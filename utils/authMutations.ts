import Cookies from 'universal-cookie';
import fromUnixTime from 'date-fns/fromUnixTime'

import { GraphQLFetch } from "./fetch.ts";
import { setUserInfo } from "../actions/states/Auth.ts";

const cookies = new Cookies();

const graphQLEndpoint = process.env.GRAPHQL_SERVER_ENDPOINT || '/api/graphql/';

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
    endpoint = graphQLEndpoint
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
        if(response.hasOwnProperty('errors')) {
            throw Error("CREATING_TOKEN_FAILED");
        } else {
            setCookies(response.data.tokenCreate);
            return response.data.tokenCreate;
        }
    })
}

export async function TokenRefresh({ endpoint = graphQLEndpoint }) {
    const mutation = `mutation { 
        tokenRefresh 
        { 
            payload 
            refreshExpiresIn 
        } 
    }`;
    const status = cookies.get('RefreshingJWT');
    if(status !== 'true') {
        // @todo add expiry time
        cookies.set('RefreshingJWT', true);
        const response = await GraphQLFetch({query: mutation, endpoint});
        cookies.set('RefreshingJWT', false);
        if (response.hasOwnProperty('errors'))
            // @todo fix
            if (status === 'true') return;
            else throw Error("REFRESHING_TOKEN_FAILED");
        else {
            setCookies(response.data.tokenRefresh);
            return response.data.tokenRefresh;
        }
    }
}

export async function TokenDelete({ endpoint = graphQLEndpoint }) {
    const mutation = `mutation { 
        deleteTokenCookie {
           deleted
        }
        deleteRefreshTokenCookie {
           deleted
        }
    }`;
    const response = await GraphQLFetch({ query: mutation, endpoint });
    if(response.hasOwnProperty('errors'))
        throw Error("DELETING_TOKEN_FAILED");
    else {

        setUserInfo(null);
        return response.data.deleteTokenCookie;
    }
}

