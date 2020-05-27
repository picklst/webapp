import React from "react";
import AsyncCreatableSelect from 'react-select/async-creatable';
import {APIRequest} from "../../../../utils";


export default ({ value, onSelect }) => {

    const createTopic = async (variables) => {
        const query = `
        mutation create_topic($name: String!)
        {
          topicCreate(name: $name)
          {
            returning
            {
              name
              slug
            }
          }
        }`;
        return await APIRequest({ query, variables, requireAuth: true }).then((data) => {
            return { success: true, data };
        }).catch((errors) => {
            return { success: false, errors}
        });
    };

    const searchTopic = async (variables) => {
        const query = `
        query topic_search($query: String!)
        {
          topicSearch(query: $query)
          {
            label: name
            value: slug
          }
        }`;
        return await APIRequest({ query, variables, requireAuth: false }).then((data) => {
            return { success: true, data };
        }).catch((errors) => {
            return { success: false, errors}
        });
    };

    const loadOptions = (inputValue, callback) => {
        searchTopic({ query: inputValue }).then(({ success, data, errors }) => {
            if(success) callback(data.topicSearch);
            else callback([]);
        });
    };


    const handleTopicSelect = (data) => {
        onSelect({
            slug: data.value,
            name: data.label
        });
    };

    const handleCreateTopic = (val) => {
        createTopic({ name: val }).then(({ success, data, errors }) => {
            if(success) {
                onSelect({
                    slug: val,
                    name: data.topicCreate.returning.name
                });
            }
        })
    };

    const getValue = () => {
        if(value && value.slug)
            return { label: value.name, value: value.slug };
    };

    return <div className="mb-2">
        <AsyncCreatableSelect
            id="list-topic-search-select"
            value={getValue()}
            placeholder="Enter / Select Topic for this list"
            isSearchable
            cacheOptions
            createOptionPosition="first"

            loadOptions={loadOptions}
            onChange={handleTopicSelect}
            onCreateOption={handleCreateTopic}
        />
    </div>

}