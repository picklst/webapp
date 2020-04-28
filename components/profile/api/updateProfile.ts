import APICall from "../../../utils/APICall.ts";

interface updateProfileAPIParams {
    username: string,
    firstName: string,
    lastName: string,
    bio: string,
    url: string,
}


async function updateProfileAPI(params: updateProfileAPIParams)
{
    const query = `mutation update_account($profile: UserUpdationInput!)
    {
      accountUpdate(input: $profile)
      {
         returning { username }
      }
    }`;

    return await APICall({ query, variables: { profile: params }, requireAuth: true }).then((res) =>
        { return res && res.data ? res.data.updateProfile : res; }
    );
}

export default updateProfileAPI;