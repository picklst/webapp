import axiosFetch from "../../utils/axios";

interface uploadMediaAPIParams {
    type: string,
    image: string
}

async function createFile(dataURI){
    let response = await fetch(dataURI);
    let data = await response.blob();
    let metadata = {
        type: 'image/jpeg'
    };
    return new File([data], "avatar.jpg", metadata);
}

async function uploadMedia({ type, image })
{
    const data = new FormData();
    const file = await  createFile(image.url);
    data.append(type, file);
    const query = `mutation upload_media
    {
      uploadMedia(type: ${type})
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