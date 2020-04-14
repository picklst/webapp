import axiosFetch from "../../../utils/axios";

interface uploadProfileMediaAPIParams {
    coverURL: string,
    avatarURL: string
}

async function createFile(dataURI){
    let response = await fetch(dataURI);
    let data = await response.blob();
    let metadata = {
        type: 'image/jpeg'
    };
    return new File([data], "avatar.jpg", metadata);
}

async function uploadProfileMedia({ coverURL, avatarURL })
{
    const data = new FormData();
    if(coverURL)
    {
        const file = await  createFile(coverURL);
        data.append('userCover', file);
    }
    if(avatarURL)
    {
        const file = await  createFile(avatarURL);
        data.append('userAvatar', file);
    }
    const query = `mutation upload_profile_media
    {
      uploadProfileMedia
    }`;
    data.append('query', query);
    return await axiosFetch({ data });
}

async function uploadProfileMediaAPI(params: uploadProfileMediaAPIParams)
{
    return await uploadProfileMedia(params).then(response => {
        if (response.errors) {
            return { errors: response.errors };
        } else if(response.data) {
            return response.data.uploadProfileMedia;
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

export default uploadProfileMediaAPI;