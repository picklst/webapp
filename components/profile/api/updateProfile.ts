async function updateProfileAPI()
{
    const query = `mutation update_account($profile: UserUpdationInput!)
    {
      accountUpdate(input: $profile)
      {
         returning { username }
      }
    }`;
    return query;
}

export default updateProfileAPI;