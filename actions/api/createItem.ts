import dataFetch from "../../utils/dataFetch";

interface createItemAPIParams {
    object: {
        name: string,
        key: string,
        comment: string,
        position: bigint,
        url: string,
    },
    slug: string
}

async function createItem({ object, slug })
{
    const query = `mutation create_item($slug: String!, $objects: [ItemInput]!){
      createItem(list: { slug: $slug}, objects: $objects)
      {
        returning {
          key
        }
      }
    }`;
    return await dataFetch({ query, variables: { slug, objects: [object] } }).then(res => res);
}

async function createItemAPI(params: createItemAPIParams)
{
    return await createItem(params).then(response => {
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

export default createItemAPI;