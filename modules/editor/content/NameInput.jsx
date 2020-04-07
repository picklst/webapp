import React, { useState } from 'react';
import shortid from 'shortid';
import TextInput from "../../../components/forms/TextInput";
import searchUserAPI from "../../../actions/api/searchUser.ts";

const NameInput = ({ id, value, onChange, autoFocus = true }) => {
    const [mentionSuggestions, setMentionSuggestions] = useState([]);

    const handleSearchUser = (key) => {
        searchUserAPI({
            key: key.slice(1),
            fields: [ 'name', 'avatarURL']
        }).then(r => {
            setMentionSuggestions(r);
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
      autoFocus
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