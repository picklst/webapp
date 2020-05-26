import React, {useEffect, useState} from 'react';
import ErrorPage from "../../components/core/ErrorPage";

import { Topic } from '../../components/pages';
import {APIRequest} from "../../utils";

const prefetchEndpoint = process.env.PREFETCH_SERVER_ENDPOINT;

const TopicPage = (props) => {
    const [name, setName] = useState(props.name);

    const [loadError, setError] = useState(false);
    const [isLoaded, setLoaded] = useState(false);

    const fetchMeta = () => {
        if(!name) {
            console.error('prefetch query failed');
            const query = `query fetch_topic($slug: String!){
              topic(slug: $slug){
                name
                slug
              }
            }`;
            APIRequest({ query, variables: { slug: props.slug }, requireAuth: false,}).then((data) => {
                setName(data.topic.name);
                setLoaded(true);
            }).catch((e) => {
                setError(true);
            });
        }
    };

    useEffect(() => fetchMeta(), []);

    const generateTitle = () => name !== null ? `${name} | Topic` : `${props.slug} | Topic `;

    const generateDescription = () => `See lists created and shared under the topic @${props.name || props.slug} on Picklst.`;

    return loadError ?
        <ErrorPage
            title="Topic Not Found"
            heading="Sorry, this page isn't available."
            description="We cannot retrieve this at at the moment. The link you followed may be broken, or the page may have been removed."
        /> :
         props.name || isLoaded ?
         <Topic name={name} slug={props.slug} title={generateTitle()} description={generateDescription()}  /> :
         isLoaded ? <ErrorPage
             title="Topic Not Found"
             heading="Sorry, this at isn't available."
             description="We cannot retrieve this topic at the moment. The link you followed may be broken, or the page may have been removed."
         /> : null;
};

TopicPage.getInitialProps = async ({ query }) => {
    const q = `query fetch_topic($slug: String!){
      topic(slug: $slug){
        name
        slug
      }
    }`;
    return await APIRequest({
        query: q,
        variables: { topic: query.slug },
        requireAuth: false,
        endpoint: prefetchEndpoint
    }).then((res) => {
        return {
            name: res.topic.name,
            slug: res.topic.slug
        }
    }).catch((e) => {
        return {
            name: null,
            slug: query.slug,
            errors: e,
            q,
        }
    })
};

export default TopicPage;