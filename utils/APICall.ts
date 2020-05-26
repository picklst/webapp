import Cookies from 'universal-cookie';

import { GraphQLFetch } from "./fetch.ts";
import { AxiosPost } from "./axios.ts";
import { TokenRefresh } from "./authMutations.ts";

const cookies = new Cookies();

const graphQLEndpoint = process.env.GRAPHQL_SERVER_ENDPOINT || '/api/graphql/';

async function RefreshToken({ endpoint = graphQLEndpoint }) {
    const exp = cookies.get('JWTTokenExpiry');
    if(exp !== null && exp !== undefined) {
        return true;
    } else {
        return await TokenRefresh({ endpoint }).then(async () => {
            const exp = cookies.get('JWTTokenExpiry');
            return exp !== null && exp !== undefined;
        });
    }
}

export async function APIFetch({
    query, variables = null, endpoint: ep = graphQLEndpoint,
    requireAuth = true
}) {
    const endpoint = ep;
    if(requireAuth)
    {
        return await RefreshToken({endpoint}).then( async (refresh) => {
            if(refresh)
            {
                return await GraphQLFetch({ query, variables, endpoint }).then(r => {
                    if (!Object.prototype.hasOwnProperty.call(r, 'errors')) {
                        return r.data;
                    } else throw r;
                }).catch((e) => { throw e });
            } else {
                console.error(refresh);
                throw new DOMException('Refreshing Failed');
            }
        });
    }
    else {
        return GraphQLFetch({ query, variables, endpoint }).then(r => {
            if (!Object.prototype.hasOwnProperty.call(r, 'errors')) {
                return r.data;
            } else throw r;
        }).catch((e) => { throw e });
    }
}

export async function APIPost({
    data, endpoint: ep = graphQLEndpoint,
    requireAuth = true
}){
    const endpoint = ep;
    if(requireAuth)
    {
        const refresh = await RefreshToken({endpoint});
        if(refresh)
        {
            return await AxiosPost({
                data, endpoint
            }).then(r => {
                if (!Object.prototype.hasOwnProperty.call(r, 'errors')) {
                    return r.data
                } else throw r;
            }).catch((e) => { throw e; })
        }
    }
    else {
        return await AxiosPost({ data, endpoint }).then(r => {
            if (!Object.prototype.hasOwnProperty.call(r, 'errors')) {
                return r.data
            } else throw r;
        }).catch((e) => { throw e; })
    }
}