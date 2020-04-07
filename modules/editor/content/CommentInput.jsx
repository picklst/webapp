import React, { useState } from "react";
import TextInput from "../../../components/forms/TextInput";
import searchUserAPI from "../../../actions/api/searchUser.ts";

const CommentInput = ({
    id, value, onChange
}) => {
    const [mentionSuggestions, setMentionSuggestions] = useState([]);

    const handleSearchUser = (key) => {
        searchUserAPI({
            key: key.slice(1),
            fields: [ 'name', 'avatarURL']
        }).then(r => {
            setMentionSuggestions(r);
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