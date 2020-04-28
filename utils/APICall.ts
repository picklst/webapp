import Cookies from 'universal-cookie';

import {GraphQLFetch} from "./fetch.ts";
import {TokenRefresh} from "./authMutations.ts";

import { API } from '../constants';

const cookies = new Cookies();

async function APICall({
    query, variables = null, endpoint: ep = false,
    requireAuth = true
}) {
    const endpoint = ep || API.providers[0].endpoint;
    if(requireAuth)
    {
        const exp = cookies.get('JWTTokenExpiry');
        if(exp !== null && exp !== undefined) {
            return GraphQLFetch({ query, variables, endpoint });
        }
        else return await TokenRefresh({ endpoint }).then(async () => {
            return await GraphQLFetch({ query, variables, endpoint }).then(r => {
                if (!Object.prototype.hasOwnProperty.call(r, 'errors')) {
                    return r.data;
                } else throw r.errors;
            }).catch((e) => { throw e });
        }).catch((e) => { throw e });
    }
    else {
        return GraphQLFetch({
            query, variables, endpoint
        })
    }
}

export default APICall;