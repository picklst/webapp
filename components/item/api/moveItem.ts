import dataFetch from "../../../utils/dataFetch";

interface moveItemAPIParams {
    key: string,
    direction: string,
    slug: string
}

async function moveItem({ key, direction, slug })
{
    const query = `mutation move_item($slug: String!, $direction: Direction!, $key: String!)
    {
        moveItem(list: { slug: $slug}, direction: $direction, key: $key)
    }`;
    return await dataFetch({ query, variables: { key, direction, slug } }).then(res => res);
}

async function moveItemAPI(params: moveItemAPIParams)
{
    return await moveItem(params).then(response => {
        if (response.errors) {
            return { errors: response.errors };
        } else if(response.data) {
            return response.data.createItem;
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

export default moveItemAPI;