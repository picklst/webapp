import React, { useState } from 'react';
import shortid from 'shortid';

import { TextInput } from "../../components/ui";
import {APIRequest} from "../../utils";

const NameInput = ({ id, value, onChange, autoFocus = true }) => {
    const [mentionSuggestions, setMentionSuggestions] = useState([]);

    const searchUser = async (variables) => {
        const query = `query search_user($key: String!)
        {
          userSearch(key: $key)
          {
            username
            name
            avatarURL
          }
        }`;
        return await APIRequest({ query, variables }).then((data) => {
            return { success: true, data };
        }).catch((errors) => {
            return { success: false, errors };
        });
    };

    const handleSearchUser = (key) => {
        searchUser({ key: key.slice(1) }).then(({ success, data, errors}) => {
            if(success) {
                setMentionSuggestions(data.userSearch);
            }
            else {
                console.error("failed to fetch suggestions on user mentioning")
            }
        });
    };

    return  <TextInput
        label="Name / Title"
        placeholder="Enter name or title"
        name="title"
        id={`list-editor-title-input-${id}-${shortid.generate()}`}
        isRequired
        errorText="You need to provide a name or title for the item."
        onChange={onChange}
        autoComplete="off"
        minimal
        type="text"
        value={value ? value : ''}
        charLimit={100}
        autoFocus={autoFocus}
        suggesters={[
            {
                'regex': /([@][\w-\d|.]+$)/g,
                'suggestions': mentionSuggestions,
                'valueField': 'username',
                'onEnter': handleSearchUser,
            }
        ]}
    />;
};

export default NameInput;