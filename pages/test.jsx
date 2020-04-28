import React, {useEffect, useState} from 'react';
import { useGlobalState } from '../actions/states/Auth.ts';
import Base from "../components/core/Base";

const jwtDecode = require('jwt-decode');

import APICall from "../utils/APICall.ts";

const TestPage = () => {
    const [isQueried, setQueried] = useState(false);
    const [data, setData] = useState(false);
    const [token, setToken] = useGlobalState('token');
    const refreshToken = useGlobalState('refreshToken');

    const query = `{
      me
      {
        username
      }
    }`;

    useEffect(() => {
        if(!isQueried) {
            APICall({ query, requireAuth: true }).then((response) => {
                setQueried(true);
                setData(response.data.me);
            })
        }
    });


    return <Base>
        <div className="d-flex align-items-center justify-content-center p-2">
            <div>
                {
                    data ?
                        <div>
                            {data.username}
                        </div>
                        : null
                }

                <div>
                    <b>refreshToken</b>: {refreshToken}
                </div>
            </div>
        </div>
    </Base>
};

export default TestPage;