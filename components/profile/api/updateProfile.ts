import dataFetch from "../../../utils/dataFetch";


interface updateProfileAPIParams {
    username: string,
    firstName: string,
    lastName: string,
    bio: string,
    url: string,
}

async function createFile(dataURI){
    let response = await fetch(dataURI);
    let data = await response.blob();
    let metadata = {
        type: 'image/jpeg'
    };
    return new File([data], "user_upload.jpg", metadata);
}

async function updateProfile(profile)
{
    const query = `mutation update_profile($profile: UserProfileInput!)
    {
      updateProfile(profile: $profile)
      {
         returning { username }
      }
    }`;
    return await dataFetch({ query, variables: { profile } }).then(res => res);
}

async function updateProfileAPI(params: updateProfileAPIParams)
{
    return await updateProfile(params).then(response => {
        if (response.errors) {
            return { errors: response.errors };
        } else if(response.data) {
            return response.data.updateProfile;
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

export default updateProfileAPI;