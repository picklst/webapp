import React, {useEffect, useState} from "react";

import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Card } from "../../../../components/ui";
import {APIRequest} from "../../../../utils";

import { Embed, Preview } from '../../views';

const emptyFun = () => {};

export default ({ url, showDeleteButton = false, onDelete = emptyFun, onFetch = emptyFun }) => {
    const [data, setData] = useState(false);

    const fetchLink = async (variables) => {
        const query = `
        query fetch_url($url: String!){
          link(url: $url)
          {
            url
            title
            description
            image
            embed {
              provider
              contentID
              contentType
            }
          }
        }`;
        return await APIRequest({ query, variables, requireAuth: false }).then((data) => {
            return { success: true, data };
        }).catch((errors) => { return { success: false, errors }})
    };

    const handleFetch = () => {
        fetchLink({ url }).then(({ success, data, errors }) => {
            if(success) {
               setData(data.link);
            }
            // else {
            //     console.log('error');
            // }
        })
    };

    useEffect(handleFetch, []);

    return <Card p={0} className="position-relative">
        { showDeleteButton && <button
            onClick={() => onDelete()}
            className="position-absolute top-0 right-0 text-dark rounded plain-button"
        >
            <FontAwesomeIcon icon={faWindowClose} />
        </button>}
        {   data && data.embed ?
            <Embed
                provider={data.embed.provider}
                ID={data.embed.contentID}
                type={data.embed.contentType}
                url={url}
            /> :
            <Preview
                url={url}
                title={data && data.title}
                description={data && data.description}
                image={data && data.image}
            />
        }
    </Card>;
};