import React, {useEffect, useState} from "react";
import {APIRequest} from "../../../utils";
import {ListCard} from "../../list";

export default ({ slug }) => {
    const [data, setData] = useState([]);

    const fetchRelatedLists = async (variables) => {
        const query = `query related_lists($slug: String!)
        {
          relatedLists(list: { slug: $slug})
          {
            name
            coverURL
            slug
            topic { name slug }    
            curator { username }
          }
        }`;
        // @todo think about requireAuth again, if logged in require it else no
        return await APIRequest({ query, variables, requireAuth: false }).then((data) => {
            return { success: true, data }
        }).catch((errors) => {
            return { success: false, errors }
        })
    };

    const handleFetch = () => {
      fetchRelatedLists({ slug }).then(({ success, data, errors}) => {
          if(success) setData(data.relatedLists);
      })
    };

    useEffect(handleFetch, []);

    return data && data.length > 0 ?
    <div>
        <h6 className="small px-2" style={{ fontWeight: 600 }}>You may also like</h6>
        {
            data.slice(0,5).map(i =>
                <div className="my-2">
                    <ListCard
                        name={i.name}
                        slug={i.slug}
                        curator={i.curator}
                        topic={i.topic}
                        coverURL={i.coverURL}
                        compact
                    />
                </div>
            )
        }
    </div> : null
}