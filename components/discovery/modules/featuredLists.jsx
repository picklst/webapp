import React, {useEffect, useState} from "react";
import styled from '@emotion/styled'
import {APIRequest} from "../../../utils";
import {ListCard} from "../../list";

const DiscoveryContainer = styled.section`
    margin: 1rem 0;
    padding: 1rem;
    min-height: 30vh;
    display: flex;
    align-items: center;
`;

const FeaturedLists = () => {

    const [data, setData] = useState([]);

    const fetchFeaturedLists = async () => {
        const query = `query fetch_topic{
          featuredLists
          {
            list {
              name
              slug
              coverURL
              curator
              {
                username
              }
              topic {
                name
              }
            }
            timestamp
          }
        }`;
        return await APIRequest({ query, requireAuth: false }).then((data) => {
            return { success: true, data }
        }).catch((errors) => {
            return { success: false, errors}
        });
    };

    const handleFetch = () => {
        fetchFeaturedLists().then(({ success, data, errors}) => {
            if(success)
            {
                setData(data.featuredLists);
            }
        });
    };

    useEffect(handleFetch, []);

    return data && data.length > 0 ?
    <DiscoveryContainer>
        <div className="container-lg p-0">
            <h3>🤩 Featured Lists</h3>
                <div className="row m-0">
                    {
                        data.map(({ list }) =>
                            <div className="col-md-6 col-lg-4 p-2">
                                <ListCard
                                    name={list.name}
                                    slug={list.slug}
                                    curator={list.curator}
                                    topic={list.topic}
                                    coverURL={list.coverURL}
                                    compact
                                />
                            </div>
                        )
                    }
                </div>
        </div>
    </DiscoveryContainer> : null
};

export default FeaturedLists;