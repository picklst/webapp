import React from 'react';

import SelectFeatured from './featured';
import SearchSelectTopic from './search';


export default ({ onSelect, selected }) => {

    const handleSelect = (topic) => {
        if(typeof onSelect === "function")
            onSelect(topic);
    };


    return <div>
        <div className="text-primary small font-weight-bold m-2">
            { selected && selected.slug ? "Topic" : "What is this list about ?"}
        </div>
        <div className="p-2">
            <SearchSelectTopic value={selected} onSelect={handleSelect} />
            {
                !(selected && selected.slug) &&
                <SelectFeatured value={selected} onSelect={handleSelect} />
            }
        </div>
    </div>
}