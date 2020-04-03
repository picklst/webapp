import React, { useState, useEffect } from "react";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import '../../../styles/list/listItemLink.sass';

// import dataFetch from "../../../utils/dataFetch";

const LinkPreview = ({ url, onDelete, onFetch }) => {
    const [isQueried, setQueried] = useState(false);
    const [isLoaded, setLoaded] = useState(false);
    const [data, setData] = useState(false);

    // const linkFetchQuery = `query fetchLink($url: String!){
    //   getLink(link: $url)
    //   {
    //     title
    //     description
    //     image
    //   }
    // }`;

    // const fetchLink = async variables => await dataFetch({ query: linkFetchQuery, variables });

    // useEffect(() => {
    //     if(!isQueried && url && url.length > 5)
    //     {
    //         fetchLink({ url }).then(response => {
    //             setQueried(true);
    //             if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
    //                 setData(response.data.getLink);
    //                 onFetch(response.data.getLink);
    //                 setLoaded(true);
    //             }
    //         });
    //     }
    // });

    const renderLinkPreview = () => <div className="list-item-link">
        <div className="card p-2 m-2">
            <button
                onClick={() => onDelete()}
                className="list-item-link-delete-button plain-button"
            >
                <FontAwesomeIcon icon={faWindowClose} />
            </button>
            <a href={url} target="_blank" className="mt-4 plain-link">
                <div className="row m-0">
                    { data.image && data.image.length > 0 ?
                        <div className="col-3">
                            <img src={data.image} className="w-100" />
                        </div>
                        : null
                    }
                    <div className="col px-0">
                        <h6>{data.title}</h6>
                        <div className="small-text" style={{ overflow: 'hidden' }}>{url}</div>
                        <p className="small-text mb-0">{data.description}</p>
                    </div>
                </div>
            </a>
        </div>
    </div>;

    return isLoaded ?
        renderLinkPreview()
        : <div className="mt-2 py-2 mx-2">
            <b>Link:</b> <a href={url}>{url}</a>
        </div>;
};


export default LinkPreview;