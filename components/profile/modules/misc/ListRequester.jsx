import React, {useState} from 'react';

import {APIRequest} from "../../../../utils";

import { ListRequester } from '../../views'

export default ({ username, onComplete, onClose }) => {

    const [subject, setSubject] = useState('');
    const [isSending, setSending] = useState(false);
    const [hasSent, setHasSent] = useState(false);

    const requestList = async (variables) => {
        const query = `
        mutation request_list($subject: String!, $username: String!){
          requestList(subject: $subject, username: $username)
        }`;
        return await APIRequest({ query, variables, requireAuth: true }).then((data) => {
            return { success: true, data }
        }).catch((error) => { return { success: false, error }});
    };

    const handleSubmit = () => {
        const variables = {
            subject,
            username
        };
        setSending(true);
        requestList(variables).then(({ success, data, errors }) => {
            if(success)
            {
                setSending(false);
                setHasSent(true);
            }
        })
    };

    return <ListRequester
        username={username}
        message={subject}
        onChange={setSubject}
        onSubmit={handleSubmit}
        onClose={onClose}
        isSending={isSending}
        hasSent={hasSent}
    />
};
