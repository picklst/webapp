
import React, {useEffect, useState} from "react";

import {APIRequest} from "../../../utils";
import Base from "../../core/Base";
import {Header, Topbar} from "../../commons";
import {Card} from "../../ui";

export default ({ name, slug, title, description }) => {

    const [data, setData] = useState({});

    const fetchTopic =  async (variables) => {
        const query = `query fetch_topic($slug: String!){
          topic(slug: $slug){
            name
            slug
            listsCount
          }
        }`;
        return await APIRequest({ query, variables, requireAuth: false }).then((data) => {
            return { success: true, data };
        }).catch((errors) => {
            return { success: true, data };
        })
    };

    const handleFetch = () => {
        fetchTopic({ slug }).then(({ success, data, errrors }) => {
            if(success)
            {
                setData(data.topic);
            }
        })
    };

    useEffect(handleFetch, []);

    return <Base meta={{ title: title, description: description }}>
        <Header />
        <Topbar
            showLogoLeft
            showTitle
            title={name}
        />
        <Card p={4} className="my-1">
            <h4 className="mb-1">{name}</h4>
            {   data && <span><b>{data.listsCount}</b> list{data.listsCount > 1 ? 's' : ''}</span> }
        </Card>
        <div className="my-5 d-flex align-items-center justify-content-center">
            <h6>Topic discovery not available right now.</h6>
        </div>
    </Base>
};