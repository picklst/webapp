import React, {useEffect, useState} from "react";
import {Button} from "../../../ui";
import classNames from "classnames";

import {APIRequest} from "../../../../utils";


export default ({ value, onSelect, }) => {

    const [topics, setTopics] = useState([]);
    const [isLoaded, setLoaded] = useState(false);

    const [cursor, setCursor] = useState(false);
    const [hasNext, setHasNext] = useState(true);

    const fetch = () => {
        const query = `query fetch_featured_topics($count: Int, $after: String){
          topicsFeatured(count: $count, after: $after)
          {
            topics
            {
              name
              slug
            }
            lastCursor
            hasNext
          }
        }`;
        setLoaded(false);
        if (hasNext) {
            let variables = {count: 10};
            if (cursor)
                variables['after'] = cursor;
            APIRequest({query, variables, requireAuth: false}).then((response) => {
                if (response.errors) {
                    console.error("error in fetching topics");
                } else {
                    setTopics([...topics, ...response.topicsFeatured.topics]);
                    setCursor(response.topicsFeatured.lastCursor);
                    setHasNext(response.topicsFeatured.hasNext);
                    setLoaded(true);
                }
            })
        }
    };

    useEffect(fetch, []);

    const renderTopics = () =>
    <div>
        {
            topics.map((t,i) =>
                <Button
                    text={t.name}
                    onClick={() => onSelect({ slug: t.slug, name: t.name })}
                    className={classNames("m-1 small", value && value === t.slug ? 'bg-primary text-light' : null)}
                />
            )
        }
        { hasNext ? <Button text="Load More..." onClick={(e) => {e.preventDefault(); fetch();}}/> : null }
    </div>;

    return isLoaded ? renderTopics() : null
}