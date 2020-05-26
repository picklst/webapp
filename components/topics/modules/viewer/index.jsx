import {APIRequest} from "../../../../utils";
import Base from "../../../core/Base";


export default ({ name, slug, description }) => {

    const fetchTopic =  async (variables) => {
        const query = `query fetch_topic($slug: String!){
          topic(slug: $slug){
            name
            slug
          }
        }`;
        return await APIRequest({ query, variables, requireAuth: false }).then((data) => {
            return { success: true, data };
        }).catch((errors) => {
            return { success: true, data };
        })
    };


    return <Base meta={{ title: name, description: description }}>

    </Base>
};