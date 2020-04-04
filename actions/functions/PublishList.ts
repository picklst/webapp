import dataFetch from "../../utils/dataFetch";

interface PublishListParams {
    name: string,
    description: string,
    tags: object,
    properties: object,
    items: object
}

async function createList(objects)
{
    const query = `mutation create_list($objects: [ListInput]){
        createList(objects: $objects)
        {
            returning
            {
                slug
            }
        }
    }`;
    const variables = { objects };
    return await dataFetch({ query, variables }).then(res => res);
}

async function PublishList(listObj: PublishListParams)
{
    const objects = [listObj];
    console.log(objects);
    return await createList(objects).then(response => {
        if (response.errors) {
            console.error("We have an error in authenticating you.");
            return { errors: response.errors };
        } else if(response.data) {
            return response.data;
        } else {
            console.error("We are facing technical issues in authenticating you.");
            return { errors: [
                    {message: "We tried our best, but we got no response from our servers. Please try refreshing the page or coming back later."}
                ]};
        }
    });
}

export default PublishList;