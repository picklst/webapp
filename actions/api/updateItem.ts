import dataFetch from "../../utils/dataFetch";

interface updateItemAPIParams {
    object: {
        name: string,
        key: string,
        comment: string,
        position: bigint,
        url: string,
    },
    slug: string
}

async function updateItem({ object, slug })
{
    const query = `mutation update_item($slug: String!, $objects: [ItemInput]!){
      updateItem(list: { slug: $slug}, objects: $objects)
      {
        returning {
          key
        }
      }
    }`;
    return await dataFetch({ query, variables: { slug, objects: [object] } }).then(res => res);
}

async function updateItemAPI(params: updateItemAPIParams)
{
    return await updateItem(params).then(response => {
        if (response.errors) {
            return { errors: response.errors };
        } else if(response.data) {
            return response.data.updateItem;
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

export default updateItemAPI;