import React, {useEffect, useState} from "react";

import {APIRequest} from "../../../../utils";

import { SearchBox, ResultViewer, SearchWindow } from "../../views";
import DropDown from "../../../ui/DropDown";


export default ({ }) => {
    const [touched, setTouched] = useState(false);
    const [focused, setFocused] = useState(false);
    const [query, setQuery] = useState('');

    const [results, setResults] = useState(false);

    const isMobile = () => typeof window !== "undefined" && window.innerWidth < 700;

    const search = async (variables) => {
        const query = `
        query search($query: String!){
          search(query: $query)
          {
            users
            {
              position
              user
              {
                firstName
                lastName
                avatarURL
                username
              }
            }
            lists
            {
              position
              list
              {
                name
                slug
                coverURL
                curator
                {
                  username
                }
              }
            }
          }
        }`;
        return await APIRequest({ query, variables, requireAuth: false}).then((data) =>  {
            return { success: true, data }
        }).catch((errors) => { return { success: false, errors }})
    };

    const handleSearch = () => {
        if(query && query.length > 0)
            search({ query }).then(({ success, data, errors}) => {
                if(success) {
                    setResults(data.search);
                } else { setResults(false); }
            })
    };

    useEffect(() => handleSearch(), [query]);
    const [showResults, setShowResults] = useState(true);
    const renderSearchBox = (autofocus) =>
    <div>
        <DropDown
            customTrigger={
                <SearchBox
                    autofocus={autofocus}
                    value={query}
                    onChange={setQuery}
                    onFocus={() => { setShowResults(true); setFocused(true); setTouched(true)}}
                    onBlur={() => setFocused(false)}
                />
            }
            dropDownClassName="mt-2 shadow-lg rounded"
            onClose={() => setShowResults(false)}
            isOpen={query.length>0 && showResults}
            dropdownComponent={!isMobile() && results && <ResultViewer isDropdown hideTypeSelector results={results} />}
        />
    </div>;

    return touched && isMobile() ?
    <SearchWindow
        showHeader={query.length === 0}
        searchBox={renderSearchBox(true)}
        onClose={() => setTouched(false)}
    >
        { results && <ResultViewer hideTypeSelector={query.length < 1} results={results} />}
    </SearchWindow> : renderSearchBox();

};