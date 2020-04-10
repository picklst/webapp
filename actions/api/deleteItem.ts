import dataFetch from "../../utils/dataFetch";

interface deleteItemAPIParams {
    key: string,
    slug: string
}

async function deleteItem({ key, slug })
{
    const query = `mutation delete_item($slug: String!, $keys: [String]!){
        deleteItem(list: { slug: $slug}, keys: $keys)
    }`;
    return await dataFetch({ query, variables: { slug, keys: [key] } }).then(res => res);
}

async function deleteItemAPI(params: deleteItemAPIParams)
{
    return await deleteItem(params).then(response => {
        if (response.errors) {
            return { errors: response.errors };
        } else if(response.data) {
            return response.data.deleteItem;
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

export default deleteItemAPI;