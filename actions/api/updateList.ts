import dataFetch from "../../utils/dataFetch";

interface updateListAPIParams {
    name: string,
    slug: string,
    description: string,
    tags: object,
    properties: object,
    items: [
        {
            name: string,
            key: string,
            comment: string,
            position: bigint,
            url: string,
        }
    ]
}

async function updateList(o)
{
    const query = `mutation update_list($objects: [ListInput]){
        updateList(objects: $objects)
        {
            returning
            {
                slug
            }
        }
    }`;
    return await dataFetch({ query, variables: { objects: [o] } }).then(res => res);
}

async function UpdateListAPI(params: updateListAPIParams)
{
    return await updateList(params).then(response => {
        if (response.errors) {
            return { errors: response.errors };
        } else if(response.data) {
            return response.data.updateList;
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

export default UpdateListAPI;