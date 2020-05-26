import React, { useState } from "react";
import { TextInput } from "../../components/ui";
import {APIRequest} from "../../utils";

const CommentInput = ({ id, value, onChange }) => {
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

    return <TextInput
        label="Comment"
        placeholder="Write here whatever you feel about this item..."
        name="description"
        id={`list-editor-description-input-${id}`}
        onChange={onChange}
        minimal
        type="textarea"
        value={value}
        isRequired={false}
        charLimit={250}
        rows={3}
        className="mt-2"
        suggesters={[
            {
                'regex': /([@][\w-\d|.]+$)/g,
                'suggestions': mentionSuggestions,
                'valueField': 'username',
                'onEnter': handleSearchUser,
            }
        ]}
        highlighters={[
            {
                'regex': /([@][\w-\d|.]+)/g,
                'className': 'user-mentions',
            },
            {
                'regex': /([#][\w-\d|.]+)/g,
                'className': 'hashtags',
            }
        ]}
        enableUserMentions
    />
};

export default CommentInput;