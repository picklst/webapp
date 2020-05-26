import axios from 'axios';
import Cookies from "universal-cookie";

const cookies = new Cookies();

export async function AxiosPost({ data, endpoint, })
{
    const APIConfig = {
        method: 'post',
        url: endpoint,
        data,
        config: {
            headers: {
                'Content-Tranfer-Encoding': 'multipart/form-data',
                'Content-Type': 'application/graphql',
                "X-CSRFToken": cookies.get('csrftoken')
            },
        },
    };

    return await axios(APIConfig).then((response) => {
        return response.data;
    }).catch((response) => {
        throw response;
    });
};