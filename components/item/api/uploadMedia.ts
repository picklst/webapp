import axiosFetch from "../../../utils/axios";

interface uploadMediaAPIParams {
    url: string,
    aspect: number,
    type: string,
    key: string
}

async function createFile(dataURI){
    let response = await fetch(dataURI);
    let data = await response.blob();
    let metadata = {
        type: 'image/jpeg'
    };
    return new File([data], "avatar.jpg", metadata);
}

async function uploadMedia({ url, aspect, type, key })
{
    const data = new FormData();
    const file = await createFile(url);
    data.append('media', file);

    const query = `mutation upload_media
    {
      uploadMedia(properties: {
        key: "${key}",
        aspect: "${aspect}",
        type: "${type}"
      })
      {
        returning {
          key
        }
      }
    }`;
    data.append('query', query);
    return await axiosFetch({ data });
}

async function uploadMediaAPI(params: uploadMediaAPIParams)
{
    return await uploadMedia(params).then(response => {
        if (response.errors) {
            return { errors: response.errors };
        } else if(response.data) {
            return response.data.uploadMedia;
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

export default uploadMediaAPI;